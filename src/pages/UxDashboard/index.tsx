import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Container,
  PageTitle,
} from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";
import UxDashboardForm from "./UxDashboardForm";
import { useParams } from "react-router-dom";
import { StyledSteps } from "./components/styled";
import { useState } from "react";
import { Preview } from "./components/Preview";

const UxDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState(0);
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
        <PageTitle>Ux Dashboard</PageTitle>
        <BSGrid>
          <BSCol size="col-lg-9">
            <StyledSteps
              current={step}
              className="aq-mb-3"
              direction="horizontal"
            >
              <StyledSteps.Step isCompleted={true} title={"Form"} />
              <StyledSteps.Step isCompleted={false} title={"Preview"} />
              <StyledSteps.Step isCompleted={false} title={"Publication"} />
            </StyledSteps>
            {step === 0 && <UxDashboardForm campaignId={id} />}
            {step === 1 && <Preview />}
            {step === 2 && (
              <div>
                bravo/a hai pubblicato tutto <br />
              </div>
            )}
          </BSCol>
          <BSCol size="col-lg-3">
            <Card title="actions" className="aq-mb-3">
              <Button
                className="aq-mb-4"
                type="primary"
                size="block"
                htmlType="submit"
                data-qa="submit-draft"
              >
                Save Draft
              </Button>
              <p className="aq-mb-2">
                <strong>Publish </strong>lorem ipsum dolor sit amet
              </p>
              {step === 0 && (
                <Button
                  htmlType="button"
                  size="block"
                  type="secondary"
                  data-qa="open-dashboard-preview"
                  onClick={() => setStep(1)}
                >
                  Preview
                </Button>
              )}
              {step === 1 && (
                <>
                  <Button
                    htmlType="button"
                    size="block"
                    type="secondary"
                    data-qa="close-dashboard-preview"
                    onClick={() => setStep(0)}
                  >
                    Back to Form
                  </Button>
                  <Button
                    htmlType="button"
                    size="block"
                    type="secondary"
                    data-qa="close-dashboard-preview"
                    onClick={() => setStep(2)}
                  >
                    Publish
                  </Button>
                </>
              )}
            </Card>
          </BSCol>
        </BSGrid>
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
