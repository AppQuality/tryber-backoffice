const useSelectionQueryTypeOptions = (): SelectOptionType[] => {
  return [
    { label: "Include", value: "filterByInclude" },
    { label: "Exclude", value: "filterByExclude" },
  ];
};

export default useSelectionQueryTypeOptions;
