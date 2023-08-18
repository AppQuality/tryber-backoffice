import {
  BSCol,
  BSGrid,
  Container,
  PageTitle,
  Steps,
} from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";
import UxDashboardForm from "./UxForm";
import { useLocation, useParams } from "react-router-dom";
import Preview from "./Preview";
import Sidebar from "./Sidebar";
import FormProvider from "./UxForm/FormProvider";
import ResultsPage from "./ResultsPage";
import { useAppSelector } from "src/store";
import styled from "styled-components";
import { useEffect } from "react";

const StyledSteps = styled(Steps)`
  .step-status-icon {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const ResponsiveCol = styled(BSCol)<{ lgOrder: number }>`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
    order: ${({ lgOrder }) => lgOrder};
  }
`;

const UxDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { currentStep } = useAppSelector((state) => state.uxDashboard);
  const { pathname, hash, key } = useLocation();
  const {
    data: permissions,
    isError,
    isLoading,
  } = useGetUsersMePermissionsQuery();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

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
            <ResponsiveCol size="col-lg-3" lgOrder={1}>
              <Sidebar />
            </ResponsiveCol>
            <ResponsiveCol size="col-lg-9" lgOrder={0}>
              <StyledSteps
                current={currentStep}
                className="aq-mb-3"
                direction="horizontal"
              >
                <StyledSteps.Step isCompleted={true} title={"Form"} />
                <StyledSteps.Step
                  isCompleted={currentStep > 0}
                  title={"Preview"}
                />
                <StyledSteps.Step
                  isCompleted={currentStep > 1}
                  title={"Publish"}
                />
              </StyledSteps>
              {currentStep === 0 && <UxDashboardForm />}
              {currentStep === 1 && <Preview />}
              {currentStep === 2 && <ResultsPage />}
            </ResponsiveCol>
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
