export default (token = false) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return new Promise((resolve) =>
    fetch(process.env.REACT_APP_API_URL + "/popups/", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return Promise.resolve([]);
      })
      .then((data) => resolve(data))
  );
};
