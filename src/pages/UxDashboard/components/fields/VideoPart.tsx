import { Field, TextareaField } from "@appquality/appquality-design-system";
import styled from "styled-components";
import Video from "@appquality/stream-player";
import { VideoControls } from "../VideoControls";
import { useAppSelector } from "src/store";
import { FormValuesInterface } from "../../UxForm/FormProvider";

const Player = styled(Video.Player)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > video {
    width: 100%;
    height: 200px;
  }
`;

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
          <Player />
          <VideoControls />
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
