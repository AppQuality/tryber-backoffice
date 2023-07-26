import {
  Card,
  Field,
  Input,
  Text,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormInsight } from "../InsightForm";
import styled from "styled-components";
import Video from "@appquality/stream-player";

const ObservationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  gap: 1rem;
  margin-bottom: 1rem;
  .play-pause-button {
    display: block;
  }
  .progress-bar {
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
      {value.map((observation, index) => (
        <Card key={observation.id}>
          <div className="aq-mb-3">
            <Video
              src="htt>p://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              start={0}
              end={20}
            >
              <Player />
              <Video.PlayPauseButton className="play-pause-button" />
              <Video.ProgressBar className="progress-bar" />
            </Video>
          </div>
          <Field name={`observations[${index}].name`} label="Title" disabled />
          <Field
            name={`observations[${index}].time`}
            label="Start"
            type="number"
            disabled
          />
          <Field
            name={`observations[${index}].end`}
            type="number"
            label="End"
          />
          <Field
            name={`observations[${index}].cluster.name`}
            label="Cluster Name"
            disabled
          />
          <TextareaField name={`observations[${index}].note`} label="Note" />
        </Card>
      ))}
    </ObservationsWrapper>
  );
};
export default VideoParts;
