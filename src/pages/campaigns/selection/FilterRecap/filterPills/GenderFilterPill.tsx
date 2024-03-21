import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const GenderFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude } = filters;

  if (
    !filterByInclude ||
    "gender" in filterByInclude === false ||
    !filterByInclude.gender
  )
    return null;

  return (
    <>
      {filterByInclude.gender.map((gender) => (
        <FilterPill
          label="Only"
          onRemove={() => {
            if (
              !filterByInclude ||
              "gender" in filterByInclude === false ||
              !filterByInclude.gender
            )
              return;
            dispatch(
              setFilters({
                filterByInclude: {
                  ...filterByInclude,
                  gender: filterByInclude.gender.filter((o) => o !== gender),
                },
              })
            );
          }}
        >
          {gender}
        </FilterPill>
      ))}
    </>
  );
};

export { GenderFilterPill };
