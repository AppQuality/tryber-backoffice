import {
  Button,
  Card,
  FormLabel,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  usePatchDossiersByCampaignQuotationsAndQuoteMutation,
  usePostDossiersByCampaignQuotationsMutation,
} from "src/services/tryberApi";
import { QuoteBanner } from "./QuoteBanner";
import { useQuoteRecap } from "./useQuoteRecap";

export const QuoteInput = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useQuoteRecap({ campaign: Number(campaignId) });
  const [value, setValue] = useState("");
  const { add } = siteWideMessageStore();
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

  const isDisabled =
    currentCampaign &&
    !["pending", "proposed"].includes(currentCampaign?.quoteStatus || "");

  if (isLoading) return null;

  return (
    <Card title="Actions" className="aq-mb-3">
      {currentCampaign && <QuoteBanner status={currentCampaign.quoteStatus} />}

      <FormLabel htmlFor="quote" label="Quote" />
      <div className="aq-mb-2">
        <Input
          id="quote"
          type="text"
          value={value}
          placeholder="1000 €"
          onChange={(e) => setValue(e)}
          disabled={isDisabled}
        />
        {!isDisabled && (
          <Text small className="aq-mt-2 aq-mb-3">
            Please enter the quote for this activity. Remember to add a unit for
            the quote <br />
            (e.g. 1000 <b>€</b> or 10 <b>Token</b>)
          </Text>
        )}
      </div>
      {!isDisabled && (
        <Button
          size="block"
          onClick={async () => {
            try {
              if (currentCampaign) {
                await updateQuote({
                  campaign: campaignId,
                  quote: currentCampaign.quoteId.toString(),
                  body: {
                    amount: value,
                  },
                }).unwrap();
              } else {
                await createQuote({
                  campaign: campaignId,
                  body: {
                    quote: value,
                  },
                }).unwrap();
              }

              add({
                type: "success",
                message: "The quote was successfully sent!",
              });
            } catch (e) {
              console.error("Cannot add/edit cp quote", e);
              add({
                type: "danger",
                message: "There was an error sending the quote",
              });
            }
          }}
        >
          Confirm quote
        </Button>
      )}
    </Card>
  );
};
