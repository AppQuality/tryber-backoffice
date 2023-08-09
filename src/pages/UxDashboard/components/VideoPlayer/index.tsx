import Video, { useVideoContext } from "@appquality/stream-player";
import styled from "styled-components";
import { VideoControls } from "./VideoControls";
import { useEffect, useRef, useState } from "react";

const PlayerWrapper = styled.div<{
  isFullScreen?: boolean;
  isLoading?: boolean;
}>`
  position: relative;
  background-color: black;
  margin-top: ${({ theme }) => parseInt(theme.grid.sizes[3]) * -1}px;
  margin-left: ${({ theme }) => parseInt(theme.grid.sizes[3]) * -1}px;
  margin-right: ${({ theme }) => parseInt(theme.grid.sizes[3]) * -1}px;
  border-top-left-radius: ${({ theme }) => theme.general.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.general.borderRadius};
  video {
    width: 100%;
    height: auto;
    min-height: 200px;
  }

  ${({ isLoading }) =>
    isLoading &&
    `
      min-height: 200px;
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
      @keyframes shine {
        to {
          background-position-x: -200%;
        }
      }
    `}

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
      video {
        height: 100%;
      }
    `}
`;

const VideoPlayer = ({ videoFieldName }: { videoFieldName: string }) => {
  const { isFullScreen } = useVideoContext();
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playerRef.current
      ?.querySelector("video")
      ?.addEventListener("loadeddata", (event) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <PlayerWrapper
      isFullScreen={isFullScreen}
      isLoading={isLoading}
      ref={playerRef}
    >
      <Video.Player />
      {!isLoading && <VideoControls videoFieldName={videoFieldName} />}
    </PlayerWrapper>
  );
};

export default VideoPlayer;
