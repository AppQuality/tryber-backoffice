import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { GetCampaignsByCampaignFormsApiResponse } from "src/services/tryberApi";

export const mapCampaingFormData = (
  data: GetCampaignsByCampaignFormsApiResponse | undefined
) =>
  data?.map((q) => ({
    label: q.shortName || q.question,
    value: q.id.toString(),
  })) || [];

export const mapSelectedQuestions = (value: Option[]) => {
  const ids: number[] = [];
  value.forEach((v) => {
    v.value && ids.push(parseInt(v.value));
  });
  return ids;
};
