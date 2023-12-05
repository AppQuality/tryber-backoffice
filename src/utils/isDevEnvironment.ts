export const isDev = () =>
  ["staging", "local"].includes(_env_.REACT_APP_ENVIRONMENT);
