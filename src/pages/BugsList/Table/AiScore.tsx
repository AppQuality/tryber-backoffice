import { useGetCampaignsByCampaignBugsAndBugIdAiReviewQuery } from "src/services/tryberApi";
import styled from "styled-components";

const StyledScore = styled.span<{ score: number }>`
  ${({ score }) => score < 40 && `color: #800208;`}
  ${({ score }) => score >= 40 && score < 60 && `color: #C78430;`}
  ${({ score }) => score >= 60 && `color: #02807A;`}
  text-transform: capitalize;
`;

const AiScore = ({
  campaignId,
  bugId,
}: {
  campaignId: string;
  bugId: number;
}) => {
  const { data, isError } = useGetCampaignsByCampaignBugsAndBugIdAiReviewQuery({
    campaign: campaignId,
    bugId: bugId.toString(),
  });

  if (!data || isError) {
    return null;
  }

  return (
    <StyledScore score={data?.score_percentage}>
      {data?.score_percentage}%
    </StyledScore>
  );
};

export default AiScore;
