import { Button } from "@appquality/appquality-design-system";
import Video from "@appquality/stream-player";
import styled from "styled-components";
import { ReactComponent as Icon } from "src/assets/edit.svg";
import { useFormikContext } from "formik";

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

const ChangeTime = styled(Video.ChangeTime)`
  background-color: ${({ theme }) => theme.colors.purple200};
  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
  position: absolute;
  top: 50%;
`;

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
      <FlexDiv>
        <CustomTimer className={"timer"} />
      </FlexDiv>
      <Video.FullScreen></Video.FullScreen>
      <FlexDiv>
        <ChangeTime value={-10} i18n={{ icon: <Icon /> }} />
        <Video.PlayPauseButton
          className="play-pause-button"
          i18n={{ play: <Icon /> }}
        />
        <Button onClick={fillEndTime}>Fill endTime</Button>
        <Video.ChangeTime value={10}></Video.ChangeTime>
      </FlexDiv>
      <ProgressBar className="progress-bar" />
    </>
  );
};
