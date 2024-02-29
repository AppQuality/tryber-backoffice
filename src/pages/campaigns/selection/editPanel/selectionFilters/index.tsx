import { Card } from "@appquality/appquality-design-system";
import styled from "styled-components";
import FilterCardHeader from "./FilterCardHeader";
import { AgeFilters } from "./FilterItems/AgeFilters";
import { BughuntingLevelFilters } from "./FilterItems/BughuntingLevelFilters";
import { DeviceFilters } from "./FilterItems/DeviceFilters";
import { GenderFilters } from "./FilterItems/GenderFilters";
import { TesterIdExclude } from "./FilterItems/TesterIdExclude";
import { TesterIdInclude } from "./FilterItems/TesterIdInclude";

const StyledSelectionFilters = styled.div``;

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  return (
    <Card data-qa="selectionFilters">
      <FilterCardHeader />
      <StyledSelectionFilters>
        <AgeFilters />
        <TesterIdInclude />
        <TesterIdExclude />
        <DeviceFilters id={id} />
        <GenderFilters id={id} />
        <BughuntingLevelFilters id={id} />
      </StyledSelectionFilters>
    </Card>
  );
};
export default SelectionFilters;
