import { Button } from "@appquality/appquality-design-system";
import Video, { useVideoContext } from "@appquality/stream-player";
import styled from "styled-components";
import { useFormikContext } from "formik";
import {
  ArrowCounterclockwise,
  ArrowClockwise,
  Scissors,
  PlayCircleFill,
  PauseCircleFill,
  ArrowsFullscreen,
  FullscreenExit,
  VolumeMuteFill,
  VolumeUpFill,
  PlayFill,
  PauseFill,
} from "react-bootstrap-icons";

const ProgressBar = styled(Video.ProgressBar)`
  :after {
    background-color: ${({ theme }) => theme.colors.purple600};
  }
  background-color: ${({ theme }) => theme.colors.purple100};
`;
const CustomTimer = styled(Video.Timer)`
  margin-left: auto;
  margin-right: 0;
  color: ${({ theme }) => theme.colors.white};
`;

const ControlsWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  svg {
    fill: white;
  }
  button {
    background-color: transparent;
    border: none;
  }
  :hover {
    opacity: 1;
  }
`;

const CenteredPlayPause = styled(Video.PlayPauseButton)`
  flex: 1 0 auto;
  border-radius: 0;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  padding: 40px 0;
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
`;

const OtherControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ChangeTime = styled(Video.ChangeTime)``;
const FullScreen = styled(Video.FullScreen)``;

export const VideoControls = ({
  videoFieldName,
}: {
  videoFieldName: string;
}) => {
  const { isFullScreen, context } = useVideoContext();
  const { setFieldValue } = useFormikContext();
  const fillEndTime = () => {
    if (context.player?.currentTime) {
      setFieldValue(
        `${videoFieldName}.end`,
        Math.round(context.player?.currentTime)
      );
    } else {
      alert("Current time is not available");
    }
  };

  return (
    <ControlsWrapper>
      <CenteredPlayPause
        i18n={{ play: <PlayCircleFill />, pause: <PauseCircleFill /> }}
      />
      <CustomTimer className={"timer"} />
      <ProgressBar className="progress-bar" />
      <OtherControls>
        <ChangeTime value={-10} i18n={{ icon: <ArrowCounterclockwise /> }} />
        <Video.Mute i18n={{ on: <VolumeUpFill />, off: <VolumeMuteFill /> }} />
        <Video.PlayPauseButton
          i18n={{ play: <PlayFill />, pause: <PauseFill /> }}
        />
        <Button onClick={fillEndTime}>
          <Scissors />
        </Button>
        <ChangeTime value={10} i18n={{ icon: <ArrowClockwise /> }} />
        <FullScreen
          i18n={{ enter: <ArrowsFullscreen />, exit: <FullscreenExit /> }}
        />
      </OtherControls>
    </ControlsWrapper>
  );
};
