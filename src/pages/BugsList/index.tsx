import { BSCol, BSGrid, Button } from "@appquality/appquality-design-system";
import Filters from "./Filters";
import Table from "./Table";
import FilterContext from "./FilterContext";
import { useParams } from "react-router-dom";
import TagsFilter from "./Filters/TagsFilter";
import { useState } from "react";
import Stats from "./Stats";

const BugsList = () => {
  const { id } = useParams<{ id: string }>();
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  return (
    <div>
      <Stats
        id={id}
        isOpen={isStatsModalOpen}
        setIsOpen={setIsStatsModalOpen}
      />
      <Button onClick={() => setIsStatsModalOpen(true)}>Stats</Button>
      <FilterContext>
        <div className="aq-my-3">
          <Filters id={id} />
        </div>
        <div className="aq-mb-4">
          <TagsFilter id={id} />
        </div>
        <BSGrid>
          <BSCol size="col-lg-12">
            <Table id={id} />
          </BSCol>
        </BSGrid>
      </FilterContext>
    </div>
  );
};

export default BugsList;
