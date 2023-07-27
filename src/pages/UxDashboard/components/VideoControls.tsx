import Video from "@appquality/stream-player";
import styled from "styled-components";

const ProgressBar = styled(Video.ProgressBar)`
  :after {
    background-color: ${({ theme }) => theme.colors.purple600};
  }
  background-color: ${({ theme }) => theme.colors.purple100};
`;
export const VideoControls = () => {
  return (
    <>
      <Video.Timer className={"timer"} />
      <div
        onClick={(e) => {
          console.log(e);
        }}
        className="flex-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <Video.ChangeTime value={-10}></Video.ChangeTime>
        <Video.PlayPauseButton className="play-pause-button" />
        <Video.ChangeTime value={10}></Video.ChangeTime>
      </div>
      <ProgressBar className="progress-bar" />
    </>
  );
};
