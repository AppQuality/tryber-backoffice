import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const AgeFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByAge } = filters;

  return (
    <>
      {filterByAge && filterByAge.min && (
        <FilterPill
          label="Minimum age"
          onRemove={() => {
            dispatch(
              setFilters({ filterByAge: { ...filterByAge, min: undefined } })
            );
          }}
        >
          {filterByAge.min}
        </FilterPill>
      )}
      {filterByAge && filterByAge.max && (
        <FilterPill
          label="Maximum age"
          onRemove={() => {
            dispatch(
              setFilters({ filterByAge: { ...filterByAge, max: undefined } })
            );
          }}
        >
          {filterByAge.max}
        </FilterPill>
      )}
    </>
  );
};

export { AgeFilterPill };
