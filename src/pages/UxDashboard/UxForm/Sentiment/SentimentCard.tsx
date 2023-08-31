import {
  Card,
  FormGroup,
  FormLabel,
  Radio,
  TextareaField,
} from "@appquality/appquality-design-system";
import { fieldName } from ".";
import { FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import styled from "styled-components";
import { ReactComponent as Sentiment1 } from "./assets/sentiment-1.svg";
import { ReactComponent as Sentiment2 } from "./assets/sentiment-2.svg";
import { ReactComponent as Sentiment3 } from "./assets/sentiment-3.svg";
import { ReactComponent as Sentiment4 } from "./assets/sentiment-4.svg";
import { ReactComponent as Sentiment5 } from "./assets/sentiment-5.svg";

const ScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SentimentCard = ({
  cluster,
  index,
}: {
  cluster: { id: number; name: string };
  index: number;
}) => {
  const { getFieldMeta, setFieldValue } =
    useFormikContext<FormValuesInterface>();
  const value = getFieldMeta(`${fieldName}[${index}].score`).value;

  const sentiments = [
    {
      id: 1,
      name: "Molto Negativo",
      value: "1",
      icon: <Sentiment1 />,
    },
    {
      id: 2,
      name: "Negativo",
      value: "2",
      icon: <Sentiment2 />,
    },
    {
      id: 3,
      name: "Neutro",
      value: "3",
      icon: <Sentiment3 />,
    },
    {
      id: 4,
      name: "Positivo",
      value: "4",
      icon: <Sentiment4 />,
    },
    {
      id: 5,
      name: "Molto Positivo",
      value: "5",
      icon: <Sentiment5 />,
    },
  ];

  return (
    <Card
      data-qa={`sentiment-score-card-${index}`}
      className="aq-mb-3"
      title={`${index + 1}. ${cluster.name}`}
    >
      <FormGroup>
        <FormLabel htmlFor={`${fieldName}[${index}].score`} label="Sentiment" />
        <ScoreWrapper>
          {sentiments.map((sentiment) => (
            <RadioWrapper>
              <Radio
                data-qa="sentiment-score"
                onChange={(val) =>
                  setFieldValue(`${fieldName}[${index}].score`, val)
                }
                label={sentiment.icon}
                id={`${fieldName}-${index}-score-${sentiment.id}`}
                value={sentiment.value}
                name={`${fieldName}[${index}].score`}
                checked={value === sentiment.value}
              />
              <span>{sentiment.name}</span>
            </RadioWrapper>
          ))}
        </ScoreWrapper>
      </FormGroup>
      <TextareaField
        height="8em"
        name={`${fieldName}[${index}].description`}
        label="Breve commento"
      />
    </Card>
  );
};

export default SentimentCard;
