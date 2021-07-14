export default ({ content, title }, token = false) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({ content, title });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw
  };

  return fetch(
    process.env.REACT_APP_API_URL + "/popups/",
    requestOptions
  ).then(response => response.json());
};
