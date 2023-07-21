import {
  Card,
  Container,
  PageTitle,
} from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";
import UxDashboardForm from "./UxDashboardForm";

const UxDashboard = () => {
  const {
    data: permissions,
    isError,
    isLoading,
  } = useGetUsersMePermissionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // user logged out
    if (window && window.top) {
      // dunno if we're inside an iframe, just use the top window
      window.top.location.href = "/wp-login.php";
      return <Container>Redirecting...</Container>;
    }
  }

  if (permissions) {
    if (permissions.appq_campaign !== true) {
      return (
        <Container>
          <ErrorUnauthorized />
        </Container>
      );
    }
  }

  return (
    <Container>
      <PageTitle>UxDashboard</PageTitle>
      <Card>
        <UxDashboardForm />
      </Card>
    </Container>
  );
};

export default UxDashboard;
