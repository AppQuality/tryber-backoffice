import {
  Container,
  PageTitle,
  Title,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetCampaignsByCampaignQuery } from "src/services/tryberApi";
import useCanSee from "./useCanSee";

const UxDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { isError, isLoading, hasPermission } = useCanSee(id);
  const { data: campaign } = useGetCampaignsByCampaignQuery({ campaign: id });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (isError) {
    // user logged out
    if (window && window.top) {
      // dunno if we're inside an iframe, just use the top window
      window.top.location.href = "/wp-login.php";
      return <Container>Redirecting...</Container>;
    }
  }

  if (hasPermission) {
    // todo: discuss about appq_video_dashboard permission (change tests)
    return (
      <PageTemplate>
        <Container>
          <PageTitle
            heading="UX Campaign Overview Dashboard"
            subtitle={`Campagna ${id} - ${campaign?.title}`}
            back={{
              text: "Vai alla dashboard video",
              navigation: `${window.location.origin}/campaigns/video/${id}/`,
              target: "_blank",
            }}
          >
            Tool di compilazione
          </PageTitle>
          <Title size="xl">
            Il CompilationTool è temporaneamente disabilitato. Contatta il
            supporto se ha bisogno di effettuare modifiche.
          </Title>
        </Container>
      </PageTemplate>
    );
  }

  return (
    <Container>
      <ErrorUnauthorized />
    </Container>
  );
};

export default UxDashboard;
