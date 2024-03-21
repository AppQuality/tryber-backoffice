import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const MetalFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude } = filters;

  if (
    !filterByInclude ||
    "metal" in filterByInclude === false ||
    !filterByInclude.metal
  )
    return null;

  return (
    <>
      {filterByInclude.metal.map((metal) => (
        <FilterPill
          label="Only"
          onRemove={() => {
            if (
              !filterByInclude ||
              "metal" in filterByInclude === false ||
              !filterByInclude.metal
            )
              return;
            dispatch(
              setFilters({
                filterByInclude: {
                  ...filterByInclude,
                  metal: filterByInclude.metal.filter((o) => o !== metal),
                },
              })
            );
          }}
        >
          {metal}
        </FilterPill>
      ))}
    </>
  );
};

export { MetalFilterPill };
