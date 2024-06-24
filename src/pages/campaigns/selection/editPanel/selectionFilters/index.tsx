import { AgeFilters } from "./FilterItems/AgeFilters";
import { BughuntingLevelFilters } from "./FilterItems/BughuntingLevelFilters";
import { DeviceFilters } from "./FilterItems/DeviceFilters";
import { GenderFilters } from "./FilterItems/GenderFilters";
import { MetalLevelFilters } from "./FilterItems/MetalLevelFilters";
import { QuestionFilters } from "./FilterItems/QuestionFilters";
import { TesterIdExclude } from "./FilterItems/TesterIdExclude";
import { TesterIdInclude } from "./FilterItems/TesterIdInclude";

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  return (
    <>
      <AgeFilters />
      <TesterIdInclude />
      <TesterIdExclude />
      <DeviceFilters id={id} />
      <GenderFilters id={id} />
      <MetalLevelFilters id={id} />
      <BughuntingLevelFilters id={id} />
      <QuestionFilters id={id} />
    </>
  );
};
export default SelectionFilters;
