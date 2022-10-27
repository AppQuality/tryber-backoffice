import { FormikHelpers } from "formik";
import { useAppDispatch } from "src/store";
import {
  changeTablePage,
  clearSelectedDevice,
  setDisableApplyFilters,
  setFilters,
} from "../../selectionSlice";

export const useFiltersValues = () => {
  const dispatch = useAppDispatch();

  const addFilter = (
    filter: { [key: string]: string[] },
    row: SelectionFilterRow
  ) => {
    if (Object.keys(filter).some((k) => k === row.filterBy.value)) {
      row.filterBy.value && filter[row.filterBy.value].push(row.search);
      return filter;
    } else
      return {
        ...filter,
        ...(row.filterBy.value ? { [row.filterBy.value]: [row.search] } : {}),
      };
  };

  const applyFilters = async (
    values: SelectionFiltersValues,
    helpers: FormikHelpers<SelectionFiltersValues>
  ) => {
    let filterByInclude: { [key: string]: string[] } = {};
    let filterByExclude: { [key: string]: string[] } = {};
    values.filters.rows?.forEach((r: SelectionFilterRow) => {
      if (r.queryType.value === "filterByInclude")
        filterByInclude = addFilter(filterByInclude, r);
      else filterByExclude = addFilter(filterByExclude, r);
    });
    dispatch(changeTablePage({ newPage: 1 }));
    dispatch(setDisableApplyFilters(true));
    dispatch(clearSelectedDevice());
    dispatch(setFilters({ filterByInclude, filterByExclude }));
  };

  return { applyFilters };
};
