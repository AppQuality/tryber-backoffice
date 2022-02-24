import { BSCol, BSGrid, Button as AppqButton } from '@appquality/appquality-design-system';
import { useEditor } from '@appquality/craft-blocks';
import lz from 'lzutf8';
import React, { useState } from 'react';

export const Topbar = ({
  onSave = false,
}: {
  onSave: false | ((data: any) => void);
}) => {
  const { actions, query, canUndo, canRedo } = useEditor(
    (state: any, query: any) => ({
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<null | undefined>();

  const [stateToLoad, setStateToLoad] = useState(null);
  if (snackbarMessage) {
    alert(snackbarMessage);
    setSnackbarMessage(null);
  }
  return (
    <BSGrid>
      <BSCol size="col-7">
        <AppqButton
          type="secondary"
          className="aq-mr-2"
          flat={true}
          disabled={!canUndo}
          onClick={() => actions.history.undo()}
        >
          Undo
        </AppqButton>
        <AppqButton
          type="secondary"
          className="aq-mr-2"
          flat={true}
          disabled={!canRedo}
          onClick={() => actions.history.redo()}
        >
          Redo
        </AppqButton>
      </BSCol>
      <BSCol size="col-5">
        <AppqButton
          size="block"
          disabled={!onSave}
          type="secondary"
          className="aq-float-right aq-mr-2"
          onClick={() => {
            const json = query.serialize();
            const base64 = lz.encodeBase64(lz.compress(json));
            onSave && onSave(base64);
          }}
        >
          Save
        </AppqButton>
      </BSCol>
    </BSGrid>
  );
};
