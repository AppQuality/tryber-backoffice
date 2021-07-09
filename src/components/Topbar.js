import { useEditor } from '@appquality/craft-blocks';
import {
  BSGrid,
  BSCol,
  Card,
  Modal,
  Button as AppqButton,
} from '@appquality/appquality-design-system';
import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import React, { useState } from 'react';

export const Topbar = () => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
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
            color="secondary"
            className="aq-float-right"
            onClick={() => setDialogOpen(true)}
          >
            Load
          </AppqButton>
          <AppqButton
            size="sm"
            flat={true}
            color="secondary"
            className="aq-float-right aq-mr-2"
            onClick={() => {
              const json = query.serialize();
              copy(lz.encodeBase64(lz.compress(json)));
              setSnackbarMessage('State copied to clipboard');
            }}
          >
            Copy current state
          </AppqButton>
          <Modal
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Load state"
            footer={
              <div className="aq-float-right aq-mb-3">
                <AppqButton
                  onClick={() => setDialogOpen(false)}
                  type="info"
                  flat={true}
                  className="aq-mx-1"
                >
                  Cancel
                </AppqButton>
                <AppqButton
                  onClick={() => {
                    setDialogOpen(false);
                    const json = lz.decompress(lz.decodeBase64(stateToLoad));
                    actions.deserialize(json);
                    setSnackbarMessage('State loaded');
                  }}
                  type="success"
                  className="aq-mx-1"
                >
                  Load
                </AppqButton>
              </div>
            }
          >
            <textarea
              placeholder='Paste the contents that was copied from the "Copy Current State" button'
              style={{ width: '100%' }}
              onChange={e => setStateToLoad(e.target.value)}
            >
              {stateToLoad || ''}
            </textarea>
          </Modal>
        </BSCol>
      </BSGrid>
    </Card>
  );
};
