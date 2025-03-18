import { Button, FormLabel, Input } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import {
  usePatchDossiersByCampaignQuotationsAndQuoteMutation,
  usePostDossiersByCampaignQuotationsMutation,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import { useQuoteRecap } from "./useQuoteRecap";

const QuoteInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.grid.spacing.default};
  justify-content: center;
`;

export const QuoteInput = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useQuoteRecap({ campaign: Number(campaignId) });
  const [value, setValue] = useState("");
  const [createQuote] = usePostDossiersByCampaignQuotationsMutation();
  const [updateQuote] = usePatchDossiersByCampaignQuotationsAndQuoteMutation();
  const [currentCampaign, setCurrentCampaign] =
    useState<(typeof data.thisCampaign)[number]>();

  useEffect(() => {
    const [currentCampaign] = data.thisCampaign;
    setCurrentCampaign(currentCampaign);
  }, [data.thisCampaign]);

  useEffect(() => {
    if (currentCampaign) setValue(currentCampaign?.amount);
  }, [currentCampaign]);

  const isDisabled = currentCampaign?.quoteStatus === "accepted";
  if (isLoading) return null;

  return (
    <QuoteInputWrapper>
      <div style={{ width: "50%" }}>
        <FormLabel htmlFor="quote" label="Quote" />
        <Input
          id="quote"
          type="text"
          value={value}
          onChange={(e) => setValue(e)}
          disabled={isDisabled}
        />
      </div>
      {!isDisabled && (
        <Button
          onClick={async () => {
            if (currentCampaign) {
              await updateQuote({
                campaign: campaignId,
                quote: currentCampaign.quoteId.toString(),
                body: {
                  amount: value,
                },
              });
            } else {
              await createQuote({
                campaign: campaignId,
                body: {
                  quote: value,
                },
              });
            }
            alert(value);
          }}
        >
          Send quote
        </Button>
      )}
    </QuoteInputWrapper>
  );
};
