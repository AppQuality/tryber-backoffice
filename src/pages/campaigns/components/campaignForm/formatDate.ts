/**
 * convert a date string formatted like this 2004-01-08T00:00:00Z to a date suitable for a input type date "yyyy-mm-dd"
 */
export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const day = `0${dateObj.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};
