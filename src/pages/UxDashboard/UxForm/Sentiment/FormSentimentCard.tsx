import {
  Card,
  ErrorMessage,
  FormGroup,
  FormLabel,
  Radio,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import styled from "styled-components";
import { fieldName } from ".";
import { FormSentiment, FormValuesInterface } from "../FormProvider";
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
  const value = getFieldMeta(`${fieldName}[${index}]`).value as FormSentiment;

  useEffect(() => {
    setFieldValue(`${fieldName}[${index}].clusterId`, cluster.id);
  }, []);
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
            <RadioWrapper key={sentiment.id}>
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
        <ErrorMessage name={`${fieldName}[${index}].value`} />
      </FormGroup>
      <TextareaField
        height="8em"
        counterMax={100}
        name={`${fieldName}[${index}].comment`}
        label={
          <div>
            Breve commento <strong>(max 100 caratteri)</strong>
          </div>
        }
      />
    </Card>
  );
};

export default FormSentimentCard;
