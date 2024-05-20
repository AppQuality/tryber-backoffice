import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import {
  PostDossiersApiArg,
  useGetDossiersByCampaignQuery,
} from "src/services/tryberApi";
import CampaignForm from "../components/campaignForm";
import { Container, PageTitle } from "@appquality/appquality-design-system";

const NewCampaign = () => {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const duplicateFrom = searchParams.get("duplicateFrom");
  const duplicateUseCases = searchParams.get("duplicateUseCases");
  const duplicateFields = searchParams.get("duplicateFields");
  const duplicateMailmerges = searchParams.get("duplicateMailmerges");
  const duplicatePages = searchParams.get("duplicatePages");
  const duplicateTesters = searchParams.get("duplicateTesters");
  return (
    <PageTemplate>
      <Container>
        <PageTitle
          back={{
            text: "Go back to campaigns list",
            navigation: "/wp-admin/admin.php?page=mvc_campaigns",
          }}
        >
          New Campaign
        </PageTitle>
        {duplicateFrom ? (
          <DuplicateCampaignForm
            dossierId={duplicateFrom}
            duplicate={{
              ...(duplicateUseCases && {
                useCases: parseInt(duplicateUseCases),
              }),
              ...(duplicateFields && { fields: parseInt(duplicateFields) }),
              ...(duplicateMailmerges && {
                mailMerges: parseInt(duplicateMailmerges),
              }),
              ...(duplicatePages && { pages: parseInt(duplicatePages) }),
              ...(duplicateTesters && { testers: parseInt(duplicateTesters) }),
              campaign: parseInt(duplicateFrom, 10),
            }}
          />
        ) : (
          <CampaignForm />
        )}
      </Container>
    </PageTemplate>
  );
};

const DuplicateCampaignForm = ({
  dossierId,
  duplicate,
}: {
  dossierId: string;
  duplicate?: PostDossiersApiArg["body"]["duplicate"];
}) => {
  const { data, isLoading } = useGetDossiersByCampaignQuery({
    campaign: dossierId,
  });
  if (isLoading || !data) return <div>Loading...</div>;

  return <CampaignForm dossier={data} duplicate={duplicate} />;
};

export default NewCampaign;
