import {
  Input,
  FormikField,
  TextareaField,
  FieldProps,
  FormGroup,
  ErrorMessage,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useVideoContext } from "@appquality/stream-player";
import VideoPlayer from "../VideoPlayer";
import moment from "moment";

const VideoPart = ({
  start,
  videoPartIndex,
  fieldName,
}: {
  start: number;
  videoPartIndex: number;
  fieldName: string;
}) => {
  const {
    context: { player },
  } = useVideoContext();
  return (
    <>
      <div className="aq-mb-3">
        <VideoPlayer videoFieldName={`${fieldName}[${videoPartIndex}]`} />
      </div>
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
        label="Note"
      />
    </>
  );
};
export default VideoPart;
