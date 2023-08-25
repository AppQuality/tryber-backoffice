import { Button } from "@appquality/appquality-design-system";
import Video, { useVideoContext } from "@appquality/stream-player";
import styled from "styled-components";
import { useFormikContext } from "formik";
import {
  ArrowCounterclockwise,
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
import { useState } from "react";
import { FormValuesInterface } from "../../FormProvider";

const controlsMargin = "10px";
const ProgressBar = styled(Video.ProgressBar)`
  cursor: pointer;
  height: 8px;
  width: calc(100% - ${controlsMargin} * 2);
  margin: ${controlsMargin} 0;
  background: ${({ theme }) => theme.colors.gray500};
  background: ${({ theme }) =>
    `linear-gradient(180deg, rgba(0,0,0,0) 39%, ${theme.colors.gray500} 40%, ${theme.colors.gray500} 60%, rgba(0,0,0,0) 61%);`};
  border-radius: 4px;
  :after {
    background-color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) =>
      `linear-gradient(180deg, rgba(0,0,0,0) 39%, ${theme.colors.white} 40%, ${theme.colors.white} 60%, rgba(0,0,0,0) 61%);`};
  }
`;
const CustomTimer = styled(Video.Timer)`
  margin-left: auto;
  margin-right: ${controlsMargin};
  color: ${({ theme }) => theme.colors.white};
`;

const ControlsWrapper = styled.div<{ show: boolean; isFullScreen: boolean }>`
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 74%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  svg {
    fill: white;
  }
  button {
    background-color: transparent;
    border: none;
  }
  ${({ isFullScreen, show }) =>
    (!isFullScreen || show) &&
    `
    &:hover {
      opacity: 1;
    }
  `}
`;

const CenteredPlayPause = styled(Video.PlayPauseButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    width: 40px;
    height: 40px;
  }
`;

const OtherControls = styled.div<{ isFullScreen?: boolean }>`
  width: calc(100% - ${controlsMargin} * 2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .player-control {
    display: inline-flex;
    cursor: pointer;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
  .player-control + .player-control {
    margin-left: 5px;
  }
  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    .player-control {
      width: 40px;
      height: 40px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
    .player-control + .player-control {
      margin-left: 8px;
    }
  `}
`;

export const VideoControls = ({
  videoFieldName,
}: {
  videoFieldName: string;
}) => {
  const [isPointerMoving, setIsPointerMoving] = useState(false);
  const [timer, setTimer] = useState<any>();
  const { isFullScreen, context, setFullScreen, togglePlay } =
    useVideoContext();
  const { setFieldValue, getFieldMeta } =
    useFormikContext<FormValuesInterface>();
  const fillEndTime = () => {
    if (context.player?.currentTime) {
      const start = getFieldMeta<
        FormValuesInterface["insights"][number]["videoParts"][number]
      >(`${videoFieldName}`).value.start;
      setFieldValue(
        `${videoFieldName}.end`,
        context.player.currentTime - start
      );
      // setIsPlaying(false); not working in this version
      if (context.isPlaying) {
        togglePlay();
      }
      setFullScreen(false);
    } else {
      alert("Current time is not available");
    }
  };

  const handleMove = () => {
    setIsPointerMoving(true);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setIsPointerMoving(false);
      }, 1500)
    );
  };

  return (
    <ControlsWrapper
      isFullScreen={isFullScreen}
      onClick={handleMove}
      onMouseMove={handleMove}
      show={isPointerMoving}
    >
      <CenteredPlayPause
        i18n={{ play: <PlayCircleFill />, pause: <PauseCircleFill /> }}
      />
      <CustomTimer className={"timer"} />
      <ProgressBar className="progress-bar" />
      <OtherControls isFullScreen={isFullScreen}>
        <Video.Mute
          className="player-control"
          i18n={{ on: <VolumeUpFill />, off: <VolumeMuteFill /> }}
        />
        <div>
          <Video.ChangeTime
            className="player-control"
            value={-10}
            i18n={{ icon: <ArrowCounterclockwise /> }}
          />
          <Video.PlayPauseButton
            className="player-control"
            i18n={{ play: <PlayFill />, pause: <PauseFill /> }}
          />
          <Button className="player-control" onClick={fillEndTime}>
            <Scissors />
          </Button>
        </div>
        <Video.FullScreen
          className="player-control"
          i18n={{ enter: <ArrowsFullscreen />, exit: <FullscreenExit /> }}
        />
      </OtherControls>
    </ControlsWrapper>
  );
};
