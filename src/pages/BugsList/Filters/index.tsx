import { Button } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "../FilterContext";

const Filters = () => {
  const value = useFiltersCardContext();
  return (
    <>
      <Button
        onClick={() => {
          value.setFilters({ test: 1 });
        }}
      >
        Set filter
      </Button>
      Filters
    </>
  );
};

export default Filters;
