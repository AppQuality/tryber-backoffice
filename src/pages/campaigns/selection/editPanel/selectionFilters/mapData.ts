import { GetCampaignsByCampaignFormsApiResponse } from "src/services/tryberApi";

export const mapCampaingFormData = (
  data: GetCampaignsByCampaignFormsApiResponse | undefined
) =>
  data?.map((q) => ({
    label: q.shortName || q.question,
    value: q.id.toString(),
  })) || [];
