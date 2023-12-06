const isStagingEnvironment = () => {
  return react_env.REACT_APP_ENVIRONMENT !== "production";
};

export default isStagingEnvironment;
