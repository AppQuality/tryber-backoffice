const useSearchParams = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const filterByStatus = queryParams.get("filterBy[status]");
  const hasFilter = filterByStatus !== null;

  return {
    ...(hasFilter
      ? {
          filterBy: {
            ...(filterByStatus
              ? {
                  status: filterByStatus
                    .split(",")
                    .map((status) => parseInt(status)),
                }
              : {}),
          },
        }
      : {}),
  };
};

export default useSearchParams;
