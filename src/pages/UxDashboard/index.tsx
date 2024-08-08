import {
  BSCol,
  BSGrid,
  Container,
  PageTitle,
  Title,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetCampaignsByCampaignQuery } from "src/services/tryberApi";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import useCanSee from "./useCanSee";
import UxDashboardForm from "./UxForm";
import FormProvider from "./UxForm/FormProvider";

const ResponsiveCol = styled(BSCol)<{ lgOrder: number }>`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
    order: ${({ lgOrder }) => lgOrder};
  }
`;

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
    return (
      <PageTemplate>
        <FormProvider>
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
              <BSGrid>
                <ResponsiveCol size="col-lg-3" lgOrder={1}>
                  <Sidebar />
                </ResponsiveCol>
                <ResponsiveCol size="col-lg-9" lgOrder={0}>
                  <UxDashboardForm />
                </ResponsiveCol>
              </BSGrid>
            </Title>
          </Container>
        </FormProvider>
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
