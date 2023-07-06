import {
  BSCol,
  BSGrid,
  Button,
  Title,
} from "@appquality/appquality-design-system";
import FilterContext from "src/pages/agreements/list/FilterContext";
import styled from "styled-components";
import CustomersFilter from "src/pages/agreements/list/Filters/CustomersFilter";
import { Agreements } from "./Agreements";

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

const AgreementsListPage = () => {
  return (
    <FluidContainer>
      <FlexContainer>
        <Title size="m">Agreements List</Title>
        <HeaderButton
          as="a"
          href={`/backoffice/agreements/new`}
          className="aq-mr-2"
        >
          + Add New
        </HeaderButton>
      </FlexContainer>
      <FilterContext>
        <div
          className="aq-mb-4"
          style={{
            margin: "1rem 0",
          }}
        >
          <CustomersFilter />
        </div>
        <BSGrid>
          <BSCol size="col-lg-12">
            <Agreements />
          </BSCol>
        </BSGrid>
      </FilterContext>
    </FluidContainer>
  );
};

export default AgreementsListPage;
