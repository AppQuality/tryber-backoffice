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
import { BSGrid, BSCol } from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOnePopup from "../api/getOnePopup";

export default ({}) => {
  let { id } = useParams();
  let [base64, setBase64] = useState(false);
  useEffect(() => {
    if (id) {
      getOnePopup(id).then(data => {
        if (data.content) {
          setBase64(data.content);
        }
      });
    }
  }, [id]);
  let json = false;
  if (base64) {
    json = lz.decompress(lz.decodeBase64(base64));
  }
  console.log(json);
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
        <Topbar />
        <div className="aq-mt-3">
          <BSGrid>
            <BSCol size="col-8">
              <div id="editor-area">
                <Frame json={json}>
                  {json ? null : (
                    <Element
                      canvas
                      is={Container}
                      className="aq-p-3"
                      data-cy="root-container"
                    >
                      <Wysiwyg
                        text={JSON.parse(
                          '{"blocks":[{"key":"3eeir","text":"Ciao Tester,","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdtka","text":"A partire dal 17 Maggio 2021 sarà necessario avere un profilo fiscale verificato per poter richiedere un pagamento sul proprio account AppQuality! 🤑","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":54,"length":26,"key":0}],"data":{}},{"key":"ekac1","text":"Per non subire interruzioni nelle tue attività ti invitiamo ad aggiornare le tue informazioni fiscali cliccando il bottone seguente ⬇️","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aelur","text":"Grazie e Keep Testing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"51t06","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/","rel":"noopener","target":"_blank","url":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/"}}}}'
                        )}
                      />
                      <Element
                        canvas
                        is={ButtonContainer}
                        data-cy="button-container"
                      >
                        <Button
                          color="success"
                          text="Vai al profilo fiscale"
                          link="https://google.com"
                          size="medium"
                          data-cy="frame-button"
                        />
                        <Button
                          color="success"
                          text="Vai al profilo fiscale"
                          link="https://google.com"
                          size="medium"
                          data-cy="frame-button"
                        />
                      </Element>
                    </Element>
                  )}
                </Frame>
              </div>
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
