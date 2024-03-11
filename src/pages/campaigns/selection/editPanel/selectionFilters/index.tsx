import { Card } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { AgeFilters } from "./FilterItems/AgeFilters";
import { BughuntingLevelFilters } from "./FilterItems/BughuntingLevelFilters";
import { DeviceFilters } from "./FilterItems/DeviceFilters";
import { GenderFilters } from "./FilterItems/GenderFilters";
import { MetalLevelFilters } from "./FilterItems/MetalLevelFilters";
import { QuestionFilters } from "./FilterItems/QuestionFilters";
import { TesterIdExclude } from "./FilterItems/TesterIdExclude";
import { TesterIdInclude } from "./FilterItems/TesterIdInclude";

const StyledSelectionFilters = styled.div``;

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  return (
    <Card title="Filters" data-qa="selectionFilters">
      <StyledSelectionFilters>
        <AgeFilters />
        <TesterIdInclude />
        <TesterIdExclude />
        <DeviceFilters id={id} />
        <GenderFilters id={id} />
        <MetalLevelFilters id={id} />
        <BughuntingLevelFilters id={id} />
        <QuestionFilters id={id} />
      </StyledSelectionFilters>
    </Card>
  );
};
export default SelectionFilters;
