import {
  BSCol,
  BSGrid,
  Button as AppqButton,
} from "@appquality/appquality-design-system";
import { useEditor } from "@appquality/craft-blocks";
import lz from "lzutf8";
import React, { useState } from "react";

export const Topbar = ({
  onSave = false,
  onPreview,
}: {
  onSave: false | ((data: any) => void);
  onPreview: () => void;
}) => {
  const { actions, query, canUndo, canRedo } = useEditor(
    (state: any, query: any) => ({
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  const [snackbarMessage, setSnackbarMessage] = useState<null | undefined>();

  if (snackbarMessage) {
    alert(snackbarMessage);
    setSnackbarMessage(null);
  }
  return (
    <BSGrid>
      <BSCol size="col-5">
        <AppqButton
          kind="secondary"
          className="aq-mr-2"
          flat={true}
          disabled={!canUndo}
          onClick={() => actions.history.undo()}
        >
          Undo
        </AppqButton>
        <AppqButton
          kind="secondary"
          className="aq-mr-2"
          flat={true}
          disabled={!canRedo}
          onClick={() => actions.history.redo()}
        >
          Redo
        </AppqButton>
      </BSCol>
      <BSCol size="col-7">
        <div style={{ display: "flex" }}>
          <AppqButton
            size="block"
            disabled={!onSave}
            flat
            kind="secondary"
            className="aq-mr-2"
            onClick={() => onPreview()}
          >
            Preview
          </AppqButton>
          <AppqButton
            size="block"
            disabled={!onSave}
            kind="secondary"
            onClick={() => {
              const json = query.serialize();
              const base64 = lz.encodeBase64(lz.compress(json));
              onSave && onSave(base64);
            }}
          >
            Save
          </AppqButton>
        </div>
      </BSCol>
    </BSGrid>
  );
};
