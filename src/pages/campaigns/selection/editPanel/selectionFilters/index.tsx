import { Card } from "@appquality/appquality-design-system";
import styled from "styled-components";
import FilterCardHeader from "./FilterCardHeader";
import { DeviceFilters } from "./FilterItems/DeviceFilters";

const StyledSelectionFilters = styled.div`
  height: 122px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  return (
    <Card data-qa="selectionFilters">
      <FilterCardHeader />
      <StyledSelectionFilters>
        <DeviceFilters id={id} />
      </StyledSelectionFilters>
    </Card>
  );
};
export default SelectionFilters;
