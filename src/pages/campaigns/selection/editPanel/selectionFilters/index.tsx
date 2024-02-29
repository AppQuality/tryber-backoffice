import { Card } from "@appquality/appquality-design-system";
import styled from "styled-components";
import FilterCardHeader from "./FilterCardHeader";
import { DeviceFilters } from "./FilterItems/DeviceFilters";
import { GenderFilters } from "./FilterItems/GenderFilters";

const StyledSelectionFilters = styled.div``;

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  return (
    <Card data-qa="selectionFilters">
      <FilterCardHeader />
      <StyledSelectionFilters>
        <DeviceFilters id={id} />
        <GenderFilters id={id} />
      </StyledSelectionFilters>
    </Card>
  );
};
export default SelectionFilters;
