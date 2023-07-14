import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Title,
} from "@appquality/appquality-design-system";
import FilterContext from "src/pages/agreements/list/FilterContext";
import styled from "styled-components";
import CustomersFilter from "src/pages/agreements/list/Filters/CustomersFilter";
import { Container } from "@appquality/appquality-design-system";
import { Agreements } from "./Agreements";
import { ReactNode } from "react";
import { useGetAgreementsQuery } from "src/services/tryberApi";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";

const FluidContainer = styled.div`
    padding: 2rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="md" type="secondary" />;
};

const AgreementsListPageContent = ({ children }: { children: ReactNode }) => {
  const { isLoading, isFetching, error } = useGetAgreementsQuery({});

  if (isFetching || isLoading) return <Container>Loading...</Container>;

  if (error && "data" in error) {
    if (error.data instanceof Object && "err" in error.data) {
      if (window && window.top) {
        // app could be in an iframe, so we need to refer to the top window
        window.top.location.href = "/wp-login.php";
        return <Container>Redirecting...</Container>;
      }
    }
    if (error.data instanceof Object && "message" in error.data) {
      return (
        <Container>
          <ErrorUnauthorized />
        </Container>
      );
    }
  }
  return <Container>{children}</Container>;
};

const AgreementsListPage = () => (
  <AgreementsListPageContent>
    <FluidContainer>
      <FlexContainer>
        <Title size="m">Agreements List</Title>
        <HeaderButton
          as="a"
          href={`/backoffice/agreements/new`}
          className="aq-mr-2"
          id="add-new-agreement-btn"
        >
          + Add New
        </HeaderButton>
      </FlexContainer>
      <Card className="aq-pb-4">
        <FilterContext>
          <div
            className="aq-mb-4"
            style={{
              margin: "1rem 0",
            }}
            data-qa="customers-select"
          >
            <CustomersFilter />
          </div>
          <BSGrid>
            <BSCol size="col-lg-12">
              <Agreements />
            </BSCol>
          </BSGrid>
        </FilterContext>
      </Card>
    </FluidContainer>
  </AgreementsListPageContent>
);

export default AgreementsListPage;
