import { Topbar } from "../components/Topbar";
import { SettingsPanel } from "../components/SettingsPanel";
import { Toolbox } from "../components/Toolbox";
import lz from "lzutf8";
import {
  Wysiwyg,
  Button,
  ButtonContainer,
  Container,
  Text,
  Frame,
  Element
} from "@appquality/craft-blocks";
import {
  BSGrid,
  BSCol,
  Input,
  Card
} from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import getOnePopup from "../api/getOnePopup";
import updatePopup from "../api/updatePopup";
import TargetSelect from "../features/TargetSelect";
import ShowOnce from "../features/ShowOnce";
import Editor from '../features/Editor'

export default ({}) => {
  let { id } = useParams();
  let history = useHistory();
  let [base64, setBase64] = useState(false);
  const [title, setTitle] = useState("");
  const [targets, setTargets] = useState("all");
  const [once, setOnce] = useState(0);
  useEffect(() => {
    if (id) {
      getOnePopup(id)
        .then(data => {
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
        .catch(err => history.push(`/backoffice/`));
    }
  }, [id]);
  let json = false;
  if (base64) {
    json = lz.decompress(lz.decodeBase64(base64));
  }
  if (!json) {
    return <p>Loading</p>;
  }
  return (
    <Editor
      onSave={data => {
        updatePopup(data, id)
          .then(data => {
            alert("Saved!");
          })
          .catch(e => {
            alert("Error!");
            console.err(e.message);
          });
      }}
      data={{
        title,
        targets,
        once
      }}
      json={json}
    ></Editor>
  );
};
