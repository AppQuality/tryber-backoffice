export const sortArrayOfObjectsByField = (field: string, array?: any[]) => {
  const newArray = array && [...array];
  return newArray?.sort((a, b) =>
    a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
  );
};
