import { Button, Card } from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import styled from "styled-components";
import FilterRow from "./filterRow";
import { mapCampaingFormData } from "./mapData";

const StyledSelectionFilters = styled.div`
  .aq-card-header {
    padding: 3px 16px;
  }
  .aq-card-body {
    height: 115px;
    overflow: auto;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .filters-btn {
    padding: 4px 30px;
  }
`;

const FilterCardHeader = ({
  onAdd,
  onApply,
}: {
  onAdd: () => void;
  onApply: () => void;
}) => (
  <StyledCardHeader>
    <div>Add filters</div>
    <div>
      <Button className="filters-btn" type="link" onClick={onAdd}>
        + Add new
      </Button>
      <Button className="filters-btn aq-ml-2" onClick={onApply} flat>
        Apply
      </Button>
    </div>
  </StyledCardHeader>
);

const filters: Option[] = [
  { label: "Os/Os version", value: "os" },
  { label: "Tester Id", value: "tester_id" },
];

interface SelectionFiltersProps {
  id: string;
}

const SelectionFilters = ({ id }: SelectionFiltersProps) => {
  const [filterByList, setFilterByList] = useState<Option[]>([]);
  const { data } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  useEffect(() => {
    if (data) {
      const questions = mapCampaingFormData(data);
      setFilterByList([...filters, ...questions]);
    }
  }, [data]);

  return (
    <StyledSelectionFilters>
      <Card
        title={
          <FilterCardHeader
            onAdd={() => console.info("onAdd")}
            onApply={() => console.info("onApply")}
          />
        }
      >
        <FilterRow
          filterByOptions={filterByList}
          onRemove={() => console.info("remove row")}
        />
        <FilterRow
          filterByOptions={filterByList}
          onRemove={() => console.info("remove row")}
        />
        <FilterRow
          filterByOptions={filterByList}
          onRemove={() => console.info("remove row")}
        />
        <FilterRow
          filterByOptions={filterByList}
          onRemove={() => console.info("remove row")}
        />
      </Card>
    </StyledSelectionFilters>
  );
};

export default SelectionFilters;
