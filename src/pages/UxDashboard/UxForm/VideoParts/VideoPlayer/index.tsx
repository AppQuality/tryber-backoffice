import Video from "@appquality/stream-player";
import styled from "styled-components";
import { VideoControls } from "./VideoControls";
import { useCallback, useEffect, useRef, useState } from "react";

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

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    video {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      display: block;
      margin: 0 auto;
      max-height: 100%;
    }
  `}

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
`;

interface ElementWithFullscreen extends HTMLDivElement {
  webkitEnterFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

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

  const handleFullScreen = useCallback(async () => {
    if (playerRef) {
      const ref = playerRef.current as ElementWithFullscreen;
      if (!isFullScreen || !document.fullscreenElement) {
        setFullScreen(true);
        if (ref.requestFullscreen) {
          await ref.requestFullscreen();
        } else if (ref.webkitRequestFullscreen) {
          await ref.webkitRequestFullscreen();
        } else if (ref.mozRequestFullScreen) {
          await ref.mozRequestFullScreen();
        } else if (ref.webkitEnterFullscreen) {
          // iOS
          await ref.webkitEnterFullscreen();
        } else if (ref.msRequestFullscreen) {
          await ref.msRequestFullscreen();
        } else {
          console.error("Fullscreen API is not supported");
          setFullScreen(false);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setFullScreen(false);
      }
    }
  }, [playerRef, isFullScreen]);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      playerRef.current.addEventListener("fullscreenchange", () => {
        setFullScreen(!!document.fullscreenElement);
      });
    }

    return () => {
      if (playerRef && playerRef.current) {
        playerRef.current.removeEventListener("fullscreenchange", () => {
          setFullScreen(!!document.fullscreenElement);
        });
      }
    };
  }, [playerRef]);

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
          setFullScreen={handleFullScreen}
        />
      )}
    </PlayerWrapper>
  );
};

export default VideoPlayer;
