import {
  Button,
  ButtonContainer,
  Container,
  Element,
  Wysiwyg,
} from "@appquality/craft-blocks";
import { useHistory } from "react-router-dom";
import createPopup from "src/api/createPopup";
import Editor from "src/features/Editor";

const usePopupsCreate = () => {
  let history = useHistory();
  return (
    <div className="popupContainer">
      <Editor
        onSave={(data) => {
          if (!data.title) {
            alert("Please specify a title for the popup");
            return;
          }
          createPopup(data)
            .then((data) => {
              alert("Saved!");
              history.push(`/backoffice/${data.id}`);
            })
            .catch((e) => {
              alert("Error!");
              console.error(e.message);
            });
        }}
      >
        <Element
          canvas
          is={Container}
          className="aq-p-3"
          data-cy="root-container"
        >
          <Wysiwyg
            text={JSON.parse(
              '{"blocks":[{"key":"3eeir","text":"Ciao tryber","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bdtka","text":"A partire dal 17 Maggio 2021 sarà necessario avere un profilo fiscale verificato per poter richiedere un pagamento sul proprio account AppQuality! 🤑","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":54,"length":26,"key":0}],"data":{}},{"key":"ekac1","text":"Per non subire interruzioni nelle tue attività ti invitiamo ad aggiornare le tue informazioni fiscali cliccando il bottone seguente ⬇️","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aelur","text":"Grazie e Keep Testing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"51t06","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/","rel":"noopener","target":"_blank","url":"https://crowd.app-quality.com/it/guida-al-nuovo-profilo-fiscale/"}}}}'
            )}
          />
          <Element canvas is={ButtonContainer} data-cy="button-container">
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
      </Editor>
    </div>
  );
};

export default usePopupsCreate;
