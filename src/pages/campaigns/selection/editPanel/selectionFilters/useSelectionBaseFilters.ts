const useSelectionBaseFilters = (): SelectOptionType[] => {
  return [
    { label: "Os/Os version", value: "os", placeholder: "Android" },
    { label: "Tester Ids", value: "testerIds", placeholder: "123, 456" },
  ];
};

export default useSelectionBaseFilters;
