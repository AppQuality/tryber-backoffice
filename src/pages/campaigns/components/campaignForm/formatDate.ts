/**
 * convert a date string formatted like this 2004-01-08T00:00:00Z to a date suitable for a input type date "yyyy-mm-dd"
 */
export const formatDate = (date: string) => {
  // const dateObj = new Date(date);
  // const year = dateObj.getFullYear();
  // const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  // const day = `0${dateObj.getDate()}`.slice(-2);
  // return `${year}-${month}-${day}`;
  return date.split("T")[0];
};

export const formatIsoToLocalDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const formatTime = (date: string) => {
  let dateObj = new Date(date);
  var userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  dateObj = new Date(dateObj.getTime() + userTimezoneOffset);
  const hours = `0${dateObj.getHours()}`.slice(-2);
  const minutes = `0${dateObj.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
};

export const dateTimeToISO = (dateString: string, timeString: string) => {
  const date = new Date(dateString);
  const time = new Date("1970-01-01T" + timeString);
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(time.getHours()) +
    ":" +
    pad(time.getMinutes()) +
    ":" +
    pad(time.getSeconds()) +
    ".000" +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};
