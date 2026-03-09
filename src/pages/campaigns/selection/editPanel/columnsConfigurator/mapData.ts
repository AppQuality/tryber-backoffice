import { GetCampaignsByCampaignFormsApiResponse } from "src/services/tryberApi";

type Option = any;

export const mapCampaingFormData = (
  data: GetCampaignsByCampaignFormsApiResponse | undefined
) =>
  data?.map((q) => ({
    label: q.shortName || q.question,
    value: q.id.toString(),
  })) || [];

export const mapSelectedQuestions = (value: Option[]) => {
  const ids: string[] = [];
  value.forEach((v) => {
    v.value && ids.push(`question_${v.value}`);
  });
  return ids;
};
