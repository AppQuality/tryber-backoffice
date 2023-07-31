import Video, { useVideoContext } from "@appquality/stream-player";
import styled from "styled-components";
import { VideoControls } from "./VideoControls";

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

const ControlsWrapper = styled.div``;

const Content = styled.div<{
  isFullScreen?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 1000;
            
            ${Player} {
                width: 100%;
                height: 100%;

                > video {
                    width: 100%;
                    height: 100%;
                }
            }

            ${ControlsWrapper} {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }
        `}
`;

export const VideoContent = ({ fieldName }: { fieldName: string }) => {
  const { isFullScreen, isMuted, context } = useVideoContext();

  return (
    <Content isFullScreen={isFullScreen}>
      <Player />
      <ControlsWrapper>
        <VideoControls
          currentTime={context.player?.currentTime}
          isMuted={isMuted}
          isFullScreen={isFullScreen}
          isPlaying={context.isPlaying}
          fieldName={fieldName}
        />
      </ControlsWrapper>
    </Content>
  );
};
