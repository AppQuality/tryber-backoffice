import lz from 'lzutf8';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import getOnePopup from 'src/api/getOnePopup';
import updatePopup from 'src/api/updatePopup';
import Editor from 'src/features/Editor';

export default ({}) => {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();
  let [base64, setBase64] = useState<false | string>(false);
  const [title, setTitle] = useState("");
  const [targets, setTargets] = useState("all");
  const [once, setOnce] = useState(0);
  useEffect(() => {
    if (id) {
      getOnePopup(id)
        .then((data) => {
          if (data.content) {
            setBase64(data.content);
          }
          if (data.title) {
            setTitle(data.title);
          }
          if (data.profiles) {
            setTargets(data.profiles);
          }
          if (data.once) {
            setOnce(data.once ? 1 : 0);
          }
        })
        .catch((err) => history.push(`/backoffice/`));
    }
  }, [id]);
  let json: false | string = false;
  if (base64) {
    json = lz.decompress(lz.decodeBase64(base64));
  }
  if (!json) {
    return <p>Loading</p>;
  }
  return (
    <div className="popupContainer">
      <Editor
        onSave={(data: any) => {
          updatePopup(data, id)
            .then((data) => {
              alert("Saved!");
            })
            .catch((e) => {
              alert("Error!");
              console.error(e.message);
            });
        }}
        data={{
          title,
          targets,
          once,
        }}
        json={json}
      ></Editor>
    </div>
  );
};
