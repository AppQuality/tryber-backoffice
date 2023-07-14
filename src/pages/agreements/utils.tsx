export const roundNumberTwoDecimals = (number: number | string) => {
  typeof number === "number" && (number = number.toString());
  return parseFloat(parseFloat(number).toFixed(2));
};

export const formatDateforAPI = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};
