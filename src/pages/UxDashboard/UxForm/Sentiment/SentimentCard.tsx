import { Card, FormLabel } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { FormValuesInterface } from "../FormProvider";
import { sentimentTypes } from "./sentimentTypes";

const Wrapper = styled.div`
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: ${(p) => p.theme.grid.sizes[4]};
  }
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.grid.sizes[2]};
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.colors.gray300};
  padding: ${(p) => p.theme.grid.sizes[2]};
`;

const SentimentCard = ({
  sentiment,
  title,
}: {
  sentiment: FormValuesInterface["sentiments"][number];
  title: string;
}) => {
  const currentValue = sentimentTypes.find((item) => {
    return item.value === sentiment.value.toString();
  });

  return (
    <Card
      data-qa={`sentiment-card-${sentiment.clusterId}`}
      className="aq-mb-3"
      title={title}
    >
      <Wrapper>
        <div>
          <FormLabel htmlFor="" label="Sentiment" />
          <Score>
            {currentValue?.icon} <small>{currentValue?.name}</small>
          </Score>
        </div>
        <div>
          <FormLabel htmlFor="" label="Breve commento" />
          <div>{sentiment.comment}</div>
        </div>
      </Wrapper>
    </Card>
  );
};

export default SentimentCard;
