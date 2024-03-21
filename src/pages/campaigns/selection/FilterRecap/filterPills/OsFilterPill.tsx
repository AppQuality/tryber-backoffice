import { useAppDispatch, useAppSelector } from "src/store";
import { setFilters } from "../../selectionSlice";
import { FilterPill } from "./_pill";

const OsFilterPill = () => {
  const { filters } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const { filterByInclude } = filters;

  if (
    !filterByInclude ||
    "os" in filterByInclude === false ||
    !filterByInclude.os
  )
    return null;

  return (
    <>
      {filterByInclude.os.map((os) => (
        <FilterPill
          label="Filtered OS"
          onRemove={() => {
            if (
              !filterByInclude ||
              "os" in filterByInclude === false ||
              !filterByInclude.os
            )
              return;
            dispatch(
              setFilters({
                filterByInclude: {
                  ...filterByInclude,
                  os: filterByInclude.os.filter((o) => o !== os),
                },
              })
            );
          }}
        >
          {os}
        </FilterPill>
      ))}
    </>
  );
};

export { OsFilterPill };
