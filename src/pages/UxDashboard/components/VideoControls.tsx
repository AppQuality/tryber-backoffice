import Video from "@appquality/stream-player";
import styled from "styled-components";

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
  margin-top: -20px;
  color: ${({ theme }) => theme.colors.purple600};
  background-color: ${({ theme }) => theme.colors.purple200};
  border-radius: 5px;
`;
export const VideoControls = () => {
  return (
    <>
      <FlexDiv>
        <CustomTimer className={"timer"} />
      </FlexDiv>

      <FlexDiv>
        <Video.ChangeTime value={-10}></Video.ChangeTime>
        <Video.PlayPauseButton className="play-pause-button" />
        <Video.ChangeTime value={10}></Video.ChangeTime>
      </FlexDiv>
      <ProgressBar className="progress-bar" />
    </>
  );
};
