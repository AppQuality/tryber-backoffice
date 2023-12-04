const isStagingEnvironment = () => {
  return _env_.REACT_APP_ENVIRONMENT !== "production";
};

export default isStagingEnvironment;
