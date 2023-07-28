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
          <VideoContent />
        </Video>
      </div>
      <Field
        name={`insights[${insightIndex}].videoparts[${index}].end`}
        type="number"
        label="End"
      />
      <TextareaField
        name={`insights[${insightIndex}].videoparts[${index}].note`}
        label="Note"
      />
    </>
  );
};
export default VideoPart;
