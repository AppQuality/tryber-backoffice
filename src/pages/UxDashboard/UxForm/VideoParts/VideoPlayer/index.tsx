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

  video {
    width: 100%;
    height: auto;
    min-height: 230px;
    @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
      min-height: 175px;
    }
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

  ${({ isFullScreen, theme }) =>
    !isFullScreen &&
    `
    margin-top: -${theme.grid.sizes[3]};
    margin-right: -${theme.grid.sizes[3]};
    margin-left: -${theme.grid.sizes[3]};
    border-top-left-radius: ${theme.general.borderRadius};
    border-top-right-radius: ${theme.general.borderRadius};
    // from card to list item in desktop  
    @media (min-width: ${theme.grid.breakpoints.lg}) {
      margin-top: 0;
      margin-right: 0;
      margin-left: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: ${theme.general.borderRadius};
    }
  `}

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    position: fixed;
    // we are inside a modal with a padding of 1rem
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
      ?.addEventListener("loadeddata", () => {
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
