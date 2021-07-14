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
  Editor,
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
    <div style={{ margin: "0 auto", width: "800px" }}>
      <Editor
        resolver={{
          Button,
          Container,
          Text,
          Wysiwyg,
          ButtonContainer
        }}
      >
        <Topbar
          onSave={content => {
            const data = { title, content, profiles: targets, once: once == 1 };
            updatePopup(data, id)
              .then(data => {
                alert("Saved!");
              })
              .catch(e => {
                alert("Error!");
                console.err(e.message);
              });
          }}
        />
        <div className="aq-mt-3">
          <BSGrid>
            <BSCol size="col-8">
              <div id="editor-area">
                <Input
                  value={title}
                  onChange={setTitle}
                  placeholder="Title..."
                />
                <Frame json={json}></Frame>
              </div>
              <Card>
                <TargetSelect value={targets} onChange={setTargets} />
                <ShowOnce value={once} onChange={setOnce} />
              </Card>
            </BSCol>
            <BSCol size="col-4">
              <Toolbox />
              <SettingsPanel />
            </BSCol>
          </BSGrid>
        </div>
      </Editor>
    </div>
  );
};
