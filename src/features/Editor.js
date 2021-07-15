import {
  Wysiwyg,
  Button,
  ButtonContainer,
  Container,
  Text,
  Frame,
  Editor
} from "@appquality/craft-blocks";

import {
  BSGrid,
  BSCol,
  Card,
  Input,
  Select,
  Title,
  FormLabel,
  PageTitle
} from "@appquality/appquality-design-system";
import TargetSelect from "./TargetSelect";
import ShowOnce from "./ShowOnce";
import { Topbar } from "../components/Topbar";
import { SettingsPanel } from "../components/SettingsPanel";
import { Toolbox } from "../components/Toolbox";

import { useState, useEffect } from "react";
export default ({ onSave, children, json, data = false }) => {
  const [title, setTitle] = useState((data && data.title) || "");
  const [targets, setTargets] = useState((data && data.targets) || "all");
  const [once, setOnce] = useState((data && data.once) || 0);
  useEffect(() => {
    setTitle((data && data.title) || "");
    setTargets((data && data.targets) || "all");
    setOnce((data && data.once) || 0);
  }, [data]);
  return (
    <>
      <PageTitle
        back={{ text: "Back", navigation: "/backoffice/" }}
        size="regular"
      >
        Crea o modifica i tuoi popup
      </PageTitle>
      <Editor
        resolver={{
          Button,
          Container,
          Text,
          Wysiwyg,
          ButtonContainer
        }}
      >
        <div className="aq-mt-3">
          <BSGrid>
            <BSCol size="col-8">
              <BSGrid>
                <BSCol size="col-12 aq-mb-3">
                  <FormLabel label="Title" />
                  <Input
                    value={title}
                    onChange={setTitle}
                    placeholder="Title..."
                  />
                </BSCol>
                <BSCol size="col-8">
                  <TargetSelect value={targets} onChange={setTargets} />
                </BSCol>
                <BSCol>
                  <ShowOnce value={once} onChange={setOnce} />
                </BSCol>
              </BSGrid>
              <div
                id="editor-area"
                className="aq-mb-3"
                style={{
                  borderTop: "1px solid rgba(0,0,0,.2)",
                  borderBottom: "1px solid rgba(0,0,0,.2)"
                }}
              >
                <Frame json={json}>{children}</Frame>
              </div>
              <Topbar
                onSave={content => {
                  const data = {
                    title,
                    content,
                    profiles: targets,
                    once: once == 1
                  };
                  onSave(data);
                }}
              />
            </BSCol>
            <BSCol size="col-4">
              <Toolbox />
              <SettingsPanel />
            </BSCol>
          </BSGrid>
        </div>
      </Editor>
    </>
  );
};
