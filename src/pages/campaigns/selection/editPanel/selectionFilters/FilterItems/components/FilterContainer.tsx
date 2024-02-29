import { Title } from "@appquality/appquality-design-system";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.grid.sizes[3]};
  ${Title} {
    margin-bottom: ${({ theme }) => theme.grid.sizes[1]};
  }
`;

export { FilterContainer };
