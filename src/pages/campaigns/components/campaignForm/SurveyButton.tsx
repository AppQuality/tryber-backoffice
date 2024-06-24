import { useGetCampaignsFormsQuery } from "src/services/tryberApi";

export const SurveyButton = ({ campaign_id }: { campaign_id: string }) => {
  const { data, isError, isLoading } = useGetCampaignsFormsQuery({
    searchBy: "campaign_id",
    search: campaign_id,
  });

  if (!data || isError || isLoading) return null;
  const hasSurvey = () => data.size > 0;
  return (
    <a
      href={
        hasSurvey()
          ? `/backoffice/campaigns/preselection-forms/${data.results[0].id}/`
          : "/backoffice/campaigns/preselection-forms/new/"
      }
      target="_blank"
    >
      {hasSurvey() ? "Edit survey" : "Create survey"}
    </a>
  );
};
