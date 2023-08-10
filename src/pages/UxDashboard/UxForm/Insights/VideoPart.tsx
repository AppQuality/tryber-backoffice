import { Field, TextareaField } from "@appquality/appquality-design-system";
import Video from "@appquality/stream-player";
import { FormValuesInterface } from "../FormProvider";
import VideoPlayer from "../../components/VideoPlayer";

const VideoPart = ({
  videopart,
  videoPartIndex,
  fieldName,
}: {
  videopart: FormValuesInterface["insights"][number]["videoPart"][number];
  videoPartIndex: number;
  fieldName: string;
}) => {
  return (
    <>
      <div className="aq-mb-3">
        <Video start={videopart.start} src={videopart.url}>
          <VideoPlayer videoFieldName={`${fieldName}[${videoPartIndex}]`} />
        </Video>
      </div>
      <Field
        name={`${fieldName}[${videoPartIndex}].end`}
        type="number"
        label="End"
      />
      <TextareaField
        name={`${fieldName}[${videoPartIndex}].description`}
        label="Note"
      />
    </>
  );
};
export default VideoPart;
