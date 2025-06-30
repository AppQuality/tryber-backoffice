import { useGetCampaignsByCampaignBugsAndBugIdAiReviewQuery } from "src/services/tryberApi";
import styled from "styled-components";

const StyledSuggestion = styled.span<{ suggestion: string }>`
  ${({ suggestion }) => suggestion === "refused" && `color: #800208;`}
  ${({ suggestion }) => suggestion === "need_review" && `color: #C78430;`}
  ${({ suggestion }) => suggestion === "approved" && `color: #02807A;`}
  text-transform: capitalize;
`;

const AiSuggestion = ({
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
  const labelMap: Record<string, string> = {
    approved: "Approved",
    refused: "Refused",
    need_review: "Need Review",
  };

  if (!data || isError) {
    return null;
  }
  const label = labelMap[data.ai_status] || data.ai_status;

  return (
    <StyledSuggestion suggestion={data.ai_status}>{label}</StyledSuggestion>
  );
};

export default AiSuggestion;
