import {
  Card,
  Container,
  PageTitle,
} from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";
import UxDashboardForm from "./UxDashboardForm";
import { useParams } from "react-router-dom";

const UxDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: permissions,
    isError,
    isLoading,
  } = useGetUsersMePermissionsQuery();

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
  if (permissions?.appq_campaign === true) {
    return (
      <Container>
        <PageTitle>UxDashboard</PageTitle>
        <Card>
          <UxDashboardForm campaignId={id} />
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <ErrorUnauthorized />
    </Container>
  );
};

export default UxDashboard;
