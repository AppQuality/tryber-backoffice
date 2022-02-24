export const getWaitingDays = (date: string): string => {
  const today = new Date().toString();
  let diffTime = Math.abs(Date.parse(today) - parseInt(date));
  diffTime = Math.round(diffTime / 1000 / 60 / 60 / 24);
  return diffTime.toString();
};

export const currencyTable: { [index: string]: string } = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};
