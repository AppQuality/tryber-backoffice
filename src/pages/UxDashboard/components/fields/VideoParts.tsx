import { Card, Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormInsight } from "../InsightForm";
import styled from "styled-components";
import Video from "@appquality/stream-player";

const ObservationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  gap: 1rem;
  margin-bottom: 1rem;
  & > div {
    margin-bottom: 0.5rem;
  }
`;
const Player = styled(Video.Player)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  > video {
    width: 100%;
    height: 200px;
  }
`;

const VideoParts = () => {
  const { getFieldProps } = useFormikContext<FormInsight>();
  const { value } = getFieldProps<FormInsight["observations"]>("observations");
  return (
    <ObservationsWrapper>
      {value.map((observation) => (
        <Card key={observation.id}>
          <Text>
            <strong>Title: </strong>
            {observation.name}
          </Text>
          <Text>
            <strong>Tester: </strong>
            {observation.tester.name}
          </Text>
          <Video
            src="htt>p://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            start={0}
            end={20}
          >
            <Player />
            <Video.PlayPauseButton />
          </Video>
        </Card>
      ))}
    </ObservationsWrapper>
  );
};
export default VideoParts;
