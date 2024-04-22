import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetDossiersByCampaignQuery } from "src/services/tryberApi";
import CampaignForm from "../components/campaignForm";

const NewCampaign = () => {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const duplicateFrom = searchParams.get("duplicateFrom");
  return (
    <PageTemplate>
      {duplicateFrom ? (
        <DuplicateCampaignForm dossierId={duplicateFrom} />
      ) : (
        <CampaignForm />
      )}
    </PageTemplate>
  );
};

const DuplicateCampaignForm = ({ dossierId }: { dossierId: string }) => {
  const { data, isLoading } = useGetDossiersByCampaignQuery({
    campaign: dossierId,
  });
  if (isLoading || !data) return <div>Loading...</div>;

  return <CampaignForm dossier={data} />;
};

export default NewCampaign;
