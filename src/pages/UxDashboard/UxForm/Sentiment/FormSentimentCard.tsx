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
import { sentimentTypes } from "./sentimentTypes";

const ScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormSentimentCard = ({
  cluster,
  index,
}: {
  cluster: { id: number; name: string };
  index: number;
}) => {
  const { getFieldMeta, setFieldValue } =
    useFormikContext<FormValuesInterface>();
  const value = getFieldMeta(`${fieldName}[${index}]`)
    .value as FormValuesInterface["sentiments"][number];

  return (
    <Card
      data-qa={`sentiment-score-card-${index}`}
      className="aq-mb-3"
      title={`${index + 1}. ${cluster.name}`}
    >
      <FormGroup>
        <FormLabel htmlFor={`${fieldName}[${index}].value`} label="Sentiment" />
        <ScoreWrapper>
          {sentimentTypes.map((sentiment) => (
            <RadioWrapper>
              <Radio
                data-qa="sentiment-score"
                onChange={(val) => {
                  setFieldValue(`${fieldName}[${index}].value`, parseInt(val));
                }}
                label={<div style={{ marginTop: "3px" }}>{sentiment.icon}</div>}
                id={`${fieldName}-${index}-score-${sentiment.id}`}
                value={sentiment.value}
                name={`${fieldName}[${index}].value`}
                checked={value?.value === parseInt(sentiment.value)}
              />
              <span>{sentiment.name}</span>
            </RadioWrapper>
          ))}
        </ScoreWrapper>
      </FormGroup>
      <TextareaField
        height="8em"
        name={`${fieldName}[${index}].comment`}
        label="Breve commento (max 100 caratteri)"
      />
    </Card>
  );
};

export default FormSentimentCard;
