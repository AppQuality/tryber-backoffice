import { Modal } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useGetCampaignsByCampaignBugsAndBugIdAiReviewQuery } from "src/services/tryberApi";
import styled from "styled-components";

const StyledSuggestion = styled.span<{ suggestion: string }>`
  ${({ suggestion }) => suggestion === "refused" && `color: #800208;`}
  ${({ suggestion }) => suggestion === "need_review" && `color: #C78430;`}
  ${({ suggestion }) => suggestion === "approved" && `color: #02807A;`}
  text-transform: capitalize;
  cursor: pointer;
`;

const AiSuggestion = ({
  campaignId,
  bugId,
}: {
  campaignId: string;
  bugId: number;
}) => {
  const [statusInfoModal, setInfoModal] = useState(false);
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
    <>
      <StyledSuggestion
        onClick={() => setInfoModal(true)}
        suggestion={data.ai_status}
      >
        {label}
      </StyledSuggestion>
      {statusInfoModal && (
        <Modal
          isOpen={statusInfoModal}
          onClose={() => setInfoModal(false)}
          title="AI Status Reason"
        >
          <p>{data.ai_reason}</p>
        </Modal>
      )}
    </>
  );
};

export default AiSuggestion;
