import { Title } from "@appquality/appquality-design-system";
import styled from "styled-components";

const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;

  .header-btn {
    padding: 4px 30px;
  }
`;

const FilterCardHeader = () => {
  return (
    <StyledCardHeader>
      <Title size="ms">Filters</Title>
    </StyledCardHeader>
  );
};

export default FilterCardHeader;
