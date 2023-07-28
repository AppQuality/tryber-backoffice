import {
  BSCol,
  BSGrid,
  Text,
  Button,
  Container,
  PageTitle,
} from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";
import UxDashboardForm from "./UxForm";
import { useParams } from "react-router-dom";
import { StyledSteps } from "./components/styled";
import { useState } from "react";
import { Preview } from "./components/Preview";
import Sidebar from "./components/Sidebar";
import FormProvider from "./UxForm/FormProvider";

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
      <FormProvider>
        <Container>
          <PageTitle
            heading="UX Campaign Overview Dashboard"
            subtitle={`Campagna ${id}`}
          >
            Tool di compilazione
          </PageTitle>
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
              {step === 0 && <UxDashboardForm />}
              {step === 1 && <Preview />}
              {step === 2 && (
                <div>
                  <Text className="aq-mb-3">
                    bravo/a hai pubblicato tutto{" "}
                    <Button
                      type="link"
                      data-qa="back-to-form"
                      onClick={() => setStep(0)}
                    >
                      Torna al form per apportare nuove modifiche
                    </Button>
                  </Text>
                </div>
              )}
            </BSCol>
            <BSCol size="col-lg-3">
              {step !== 2 && <Sidebar step={step} setStep={setStep} />}
            </BSCol>
          </BSGrid>
        </Container>
      </FormProvider>
    );
  }

  return (
    <Container>
      <ErrorUnauthorized />
    </Container>
  );
};

export default UxDashboard;
