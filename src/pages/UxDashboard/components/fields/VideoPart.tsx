import {
  Card,
  Field,
  TextareaField,
} from "@appquality/appquality-design-system";
import styled from "styled-components";
import Video from "@appquality/stream-player";
import { VideoControls } from "../VideoControls";
import { FormValuesInterface } from "../../UxDashboardForm";

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
  return (
    <>
      <div className="aq-mb-3">
        <Video start={videopart.start} src={videopart.url}>
          <Player />
          <VideoControls />
        </Video>
      </div>
      <Field name={`videoparts[${index}].end`} type="number" label="End" />
      <TextareaField name={`videoparts[${index}].note`} label="Note" />
    </>
  );
};
export default VideoPart;
