import {
  Input,
  FormikField,
  TextareaField,
  FieldProps,
  FormGroup,
  ErrorMessage,
  FormLabel,
  Button,
} from "@appquality/appquality-design-system";
import { useVideoContext } from "@appquality/stream-player";
import VideoPlayer from "./VideoPlayer";
import moment from "moment";
import styled from "styled-components";
import { GripVertical, Trash } from "react-bootstrap-icons";
import { ListItemCard } from "./ListItemCard";

const Handler = styled.div`
  margin: ${({ theme }) => theme.grid.sizes[4]} 0;
  cursor: grab !important;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.gray500};
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.grid.sizes[2]};
  padding-bottom: ${({ theme }) => theme.grid.sizes[4]};
`;

const DeleteButton = styled(Button)`
  border-radius: 50%;
  border: none;
  padding: 8px 4px;
  transition: all 0.2s;
  width: 36px;
  min-width: 36px;
  height: 36px;
  min-height: 36px;
`;

const VideoPart = ({
  start,
  videoPartIndex,
  fieldName,
  remove,
  handleDragProps,
  title,
}: {
  start: number;
  videoPartIndex: number;
  fieldName: string;
  remove: (index: number) => void;
  handleDragProps: any;
  title?: string;
}) => {
  const {
    context: { player },
  } = useVideoContext();
  return (
    <ListItemCard data-qa={`insight-videopart-${videoPartIndex}`}>
      <VideoPlayer
        videoFieldName={`${fieldName}[${videoPartIndex}]`}
        title={title}
      />
      <div>
        <FormikField
          name={`${fieldName}[${videoPartIndex}].end`}
          validate={(value: number) => {
            if (player) {
              let error;
              if (value > player.totalTime) {
                error = "Non puoi tagliare oltre la durata del video";
              }
              if (value < start) {
                error =
                  "Non puoi tagliare prima dello start che hai impostato a " +
                  moment.utc(start * 1000).format("HH:mm:ss") +
                  "";
              }
              return error;
            }
          }}
        >
          {({ field, form }: FieldProps) => (
            <FormGroup>
              <FormLabel htmlFor={field.name} label="End" />
              <Input
                type="time"
                data-qa="videopart-end"
                id={field.name}
                extra={{
                  name: field.name,
                  step: 1,
                  onBlur: () => {
                    field.onBlur(field.name);
                    form.setFieldTouched(field.name);
                    form.validateField(field.name);
                  },
                }}
                value={moment.utc(field.value * 1000).format("HH:mm:ss")}
                onChange={(value) => {
                  form.setFieldValue(
                    field.name,
                    moment.duration(value).asSeconds()
                  );
                }}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          )}
        </FormikField>
        <TextareaField
          name={`${fieldName}[${videoPartIndex}].description`}
          placeholder="Scrivi una nota o una descrizione"
          label="Descrizione"
          height="4em"
        />
      </div>
      <Actions>
        <DeleteButton
          htmlType="button"
          data-qa="delete-videopart"
          type="danger"
          flat
          onClick={() => {
            window.confirm("Are you sure you wish to delete this item?") &&
              remove(videoPartIndex);
          }}
        >
          <Trash size={16} />
        </DeleteButton>
        <Handler {...handleDragProps} role="handler">
          <GripVertical size={18} />
        </Handler>
      </Actions>
    </ListItemCard>
  );
};
export default VideoPart;
