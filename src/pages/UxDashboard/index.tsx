import {
  BSCol,
  BSGrid,
  Text,
  Button,
  Card,
  Container,
  PageTitle,
  Steps,
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
          {step !== 2 && (
            <BSCol size="col-lg-3">
              <Card title="actions" className="aq-mb-3">
                {step === 0 && (
                  <>
                    <Button
                      className="aq-mb-1"
                      type="primary"
                      flat
                      size="block"
                      htmlType="submit"
                      data-qa="submit-draft"
                      onClick={() => alert("submit draft")}
                    >
                      Save Draft
                    </Button>
                    <Text small className="aq-mb-3">
                      last saved: 1 minute ago
                    </Text>
                  </>
                )}
                {step === 1 && (
                  <Button
                    className="aq-mb-3"
                    type="primary"
                    flat
                    size="block"
                    data-qa="close-dashboard-preview"
                    onClick={() => setStep(0)}
                  >
                    Back to Form
                  </Button>
                )}
                {step === 0 && (
                  <>
                    <Button
                      className="aq-mb-1"
                      htmlType="button"
                      size="block"
                      type="secondary"
                      data-qa="open-dashboard-preview"
                      onClick={() => setStep(1)}
                    >
                      Preview
                    </Button>
                    <Text small className="aq-mb-3">
                      Per <strong>pubblicare</strong> passa prima dalla preview
                    </Text>
                  </>
                )}
                {step === 1 && (
                  <Button
                    htmlType="button"
                    size="block"
                    type="secondary"
                    data-qa="close-dashboard-preview"
                    onClick={() => setStep(2)}
                  >
                    Publish
                  </Button>
                )}
              </Card>
              {step === 0 && (
                <Card title="Sezioni del form" className="aq-mb-3">
                  <Steps direction="vertical" current={0}>
                    <Steps.Step title="Sulla Campagna" />
                    <Steps.Step title="Panoramica" />
                    <Steps.Step title="Nel dettaglio" />
                  </Steps>
                </Card>
              )}
            </BSCol>
          )}
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
