import { useEditor } from "@appquality/craft-blocks";
import {
  BSGrid,
  BSCol,
  Card,
  Modal,
  Button as AppqButton
} from "@appquality/appquality-design-system";
import copy from "copy-to-clipboard";
import createPopup from "../api/createPopup";
import lz from "lzutf8";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Topbar = ({ onSave = false }) => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo()
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const [stateToLoad, setStateToLoad] = useState(null);
  if (snackbarMessage) {
    alert(snackbarMessage);
    setSnackbarMessage(null);
  }
  return (
    <Card>
      <BSGrid>
        <BSCol>
          <AppqButton
            size="sm"
            color="secondary"
            className="aq-mr-2"
            flat={true}
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            Undo
          </AppqButton>
          <AppqButton
            size="sm"
            color="secondary"
            className="aq-mr-2"
            flat={true}
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
          >
            Redo
          </AppqButton>
        </BSCol>
        <BSCol>
          <AppqButton
            size="sm"
            flat={true}
            disabled={!onSave}
            color="secondary"
            className="aq-float-right aq-mr-2"
            onClick={() => {
              const json = query.serialize();
              const base64 = lz.encodeBase64(lz.compress(json));
              onSave(base64);
            }}
          >
            Save
          </AppqButton>
        </BSCol>
      </BSGrid>
    </Card>
  );
};
