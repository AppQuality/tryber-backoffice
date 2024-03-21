import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const BugHuntingFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude } = filters;

  if (
    !filterByInclude ||
    "bughunting" in filterByInclude === false ||
    !filterByInclude.bughunting
  )
    return null;

  return (
    <>
      {filterByInclude.bughunting.map((bughunting) => (
        <FilterPill
          label="Only"
          onRemove={() => {
            if (
              !filterByInclude ||
              "bughunting" in filterByInclude === false ||
              !filterByInclude.bughunting
            )
              return;
            dispatch(
              setFilters({
                filterByInclude: {
                  ...filterByInclude,
                  bughunting: filterByInclude.bughunting.filter(
                    (o) => o !== bughunting
                  ),
                },
              })
            );
          }}
        >
          {bughunting}
        </FilterPill>
      ))}
    </>
  );
};

export { BugHuntingFilterPill };
