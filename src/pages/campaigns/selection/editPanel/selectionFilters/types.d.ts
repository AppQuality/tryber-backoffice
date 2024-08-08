type SelectionFiltersValues = {
  filters: { rows?: SelectionFilterRow[] };
};

interface SelectionFilterRow {
  id: string;
  filterBy: SelectOptionType;
  queryType: SelectOptionType;
  search: string;
}

type CustomQuestionOption = { value: string | number; isInvalid?: boolean };
