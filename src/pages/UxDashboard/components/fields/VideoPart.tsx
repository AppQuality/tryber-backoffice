import { Field, TextareaField } from "@appquality/appquality-design-system";
import Video from "@appquality/stream-player";
import { FormValuesInterface } from "../../UxForm/FormProvider";
import { VideoContent } from "../VideoContent";
import { useAppSelector } from "src/store";

const VideoPart = ({
  videopart,
  index,
}: {
  videopart: FormValuesInterface["insights"][number]["videoPart"][number];
  index: number;
}) => {
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  return (
    <>
      <div className="aq-mb-3">
        <Video start={videopart.start} src={videopart.url}>
          <VideoContent
            fieldName={`insights[${insightIndex}].videoPart[${index}].end`}
          />
        </Video>
      </div>
      <Field
        name={`insights[${insightIndex}].videoPart[${index}].end`}
        type="number"
        label="End"
      />
      <TextareaField
        name={`insights[${insightIndex}].videoPart[${index}].note`}
        label="Note"
      />
    </>
  );
};
export default VideoPart;
