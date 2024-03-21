import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const TesterFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude, filterByExclude } = filters;

  return (
    <>
      {filterByInclude &&
        "testerIds" in filterByInclude &&
        filterByInclude.testerIds && (
          <FilterPill
            label="Filtered testers"
            onRemove={() => {
              dispatch(
                setFilters({
                  filterByInclude: { ...filterByInclude, testerIds: undefined },
                })
              );
            }}
          >
            {filterByInclude.testerIds.split(",").length} testers
          </FilterPill>
        )}
      {filterByExclude && filterByExclude.testerIds && (
        <FilterPill
          label="Excluded testers"
          onRemove={() => {
            dispatch(
              setFilters({
                filterByExclude: { ...filterByExclude, testerIds: undefined },
              })
            );
          }}
        >
          {filterByExclude.testerIds.split(",").length} testers
        </FilterPill>
      )}
    </>
  );
};

export { TesterFilterPill };
