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
import { Trash } from "react-bootstrap-icons";
import { ListItemCard } from "./ListItemCard";
import { videoCitMaxChar } from "../FormProvider";
import Handler from "../components/Handler";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

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
  handleDragProps?: DraggableProvidedDragHandleProps | null;
  title?: string;
}) => {
  const {
    context: { player },
  } = useVideoContext();

  return (
    <ListItemCard data-qa={`insight-videopart-${videoPartIndex}`}>
      <Handler handleDragProps={handleDragProps} />
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
              if (value > player.totalTime - start) {
                error = "Non puoi tagliare oltre la durata del video";
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
                value={
                  !field.value
                    ? "00:00:00"
                    : moment.utc(field.value * 1000).format("HH:mm:ss")
                }
                onChange={(value) => {
                  form.setFieldValue(
                    field.name,
                    moment.duration(value).asSeconds()
                  );
                  form.setFieldTouched(field.name);
                }}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          )}
        </FormikField>
        <TextareaField
          name={`${fieldName}[${videoPartIndex}].description`}
          counterMax={videoCitMaxChar}
          placeholder="Scrivi una nota o una descrizione"
          label={
            <div>
              Citazione utente{" "}
              <strong>(Massimo {videoCitMaxChar} caratteri)</strong>
            </div>
          }
          height="4em"
        />
      </div>
      <Actions>
        <DeleteButton
          type="button"
          data-qa="delete-videopart"
          kind="danger"
          flat
          onClick={() => {
            window.confirm("Are you sure you wish to delete this item?") &&
              remove(videoPartIndex);
          }}
        >
          <Trash size={16} />
        </DeleteButton>
      </Actions>
    </ListItemCard>
  );
};
export default VideoPart;
