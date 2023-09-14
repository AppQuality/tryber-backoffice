import Video from "@appquality/stream-player";
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
    max-height: 200px;
  }

  ${({ isLoading }) =>
    isLoading &&
    `
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
    border-top-left-radius: ${theme.general.borderRadius};
    border-top-right-radius: ${theme.general.borderRadius};
    // from card to list item in desktop  
    @media (min-width: ${theme.grid.breakpoints.lg}) {
      border-top-right-radius: 0;
      border-bottom-left-radius: ${theme.general.borderRadius};
    }
  `}

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 1000;
    video {
      max-height: 100vh;
    }
  `}
`;

const VideoPlayer = ({
  videoFieldName,
  title,
}: {
  videoFieldName: string;
  title?: string;
}) => {
  const [isFullScreen, setFullScreen] = useState(false);
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
      {!isLoading && (
        <VideoControls
          videoFieldName={videoFieldName}
          title={title}
          isFullScreen={isFullScreen}
          setFullScreen={setFullScreen}
        />
      )}
    </PlayerWrapper>
  );
};

export default VideoPlayer;
