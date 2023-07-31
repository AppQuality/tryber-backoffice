import { Button } from "@appquality/appquality-design-system";
import Video from "@appquality/stream-player";
import styled from "styled-components";
import { useFormikContext } from "formik";
import {
  ArrowCounterclockwise,
  ArrowClockwise,
  ClockHistory,
  PlayCircleFill,
  PauseCircleFill,
  ArrowsFullscreen,
  FullscreenExit,
  VolumeMuteFill,
  VolumeUpFill,
} from "react-bootstrap-icons";

const ProgressBar = styled(Video.ProgressBar)`
  :after {
    background-color: ${({ theme }) => theme.colors.purple600};
  }
  background-color: ${({ theme }) => theme.colors.purple100};
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const CustomTimer = styled(Video.Timer)`
  margin-left: auto;
  margin-right: auto;
  margin-top: -31px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.purple200};
  border-radius: 5px;
  padding: 5px;
`;
const PlayPauseButton = styled(Video.PlayPauseButton)``;
const MuteButton = styled(Video.Mute)``;

const CenteredPlayPause = styled(Video.PlayPauseButton)`
  background-color: ${({ theme }) => theme.colors.purple200};
  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
  position: absolute;
  top: 50%;
`;
const ChangeTime = styled(Video.ChangeTime)``;
const FullScreen = styled(Video.FullScreen)``;

export const VideoControls = ({
  currentTime,
  fieldName,
}: {
  currentTime?: number;
  fieldName: string;
}) => {
  const { setFieldValue } = useFormikContext();
  const fillEndTime = () => {
    if (currentTime) {
      setFieldValue(fieldName, Math.round(currentTime));
    } else {
      alert("Current time is not available");
    }
  };

  return (
    <>
      <FlexDiv style={{ backgroundColor: "green" }}>
        <CustomTimer className={"timer"} />
      </FlexDiv>
      <FlexDiv style={{ backgroundColor: "red" }}>
        <FullScreen
          i18n={{ enter: <ArrowsFullscreen />, exit: <FullscreenExit /> }}
        />

        <ChangeTime value={-10} i18n={{ icon: <ArrowCounterclockwise /> }} />
        <CenteredPlayPause
          className="play-pause-button"
          i18n={{ play: <PlayCircleFill />, pause: <PauseCircleFill /> }}
        />
        <PlayPauseButton
          className="play-pause-button"
          i18n={{ play: <PlayCircleFill />, pause: <PauseCircleFill /> }}
        />
        <Button onClick={fillEndTime}>
          <ClockHistory />
        </Button>
        <ChangeTime value={10} i18n={{ icon: <ArrowClockwise /> }} />
        <MuteButton i18n={{ on: <VolumeUpFill />, off: <VolumeMuteFill /> }} />
      </FlexDiv>
      <ProgressBar className="progress-bar" />
    </>
  );
};
