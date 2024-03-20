import styled from "styled-components";
import { AgeFilterPill } from "./filterPills/AgeFilterPill";
import { BugHuntingFilterPill } from "./filterPills/BugHuntingFilterPill";
import { GenderFilterPill } from "./filterPills/GenderFilterPill";
import { MetalFilterPill } from "./filterPills/MetalFilterPill";
import { OsFilterPill } from "./filterPills/OsFilterPill";
import { QuestionsFilterPill } from "./filterPills/QuestionsFilterPill";
import { TesterFilterPill } from "./filterPills/TesterFilterPill";

const FilterRecapWrapper = styled.div`
  display: flex;
  padding: ${(props) => props.theme.grid.sizes[1]};
  gap: ${(props) => props.theme.grid.sizes[1]};
  flex-wrap: wrap;
`;

const FilterRecap = ({ id }: { id: string }) => {
  return (
    <FilterRecapWrapper>
      <AgeFilterPill />
      <TesterFilterPill />
      <OsFilterPill />
      <MetalFilterPill />
      <GenderFilterPill />
      <BugHuntingFilterPill />
      <QuestionsFilterPill id={id} />
    </FilterRecapWrapper>
  );
};

export { FilterRecap };
