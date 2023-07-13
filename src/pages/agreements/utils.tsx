export const roundNumberTwoDecimals = (number: number | string) => {
  typeof number === "number" && (number = number.toString());
  return parseFloat(parseFloat(number).toFixed(2));
};
