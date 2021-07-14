import getAllPopups from "./getAllPopups";

export default (id, token = false) => {
  return new Promise((resolve, reject) =>
    getAllPopups(token)
      .then(data => {
        if (!data.length) return reject(Error("No data"));
        const res = data.filter(p => p.id == id);
        if (!res.length) return reject(Error("No data"));
        resolve(res[0]);
      })
      .catch(reject)
  );
};
