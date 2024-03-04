import {
  BSCol,
  BSGrid,
  Button,
  Modal,
} from "@appquality/appquality-design-system";
import { FC } from "react";
import {
  clearSelectedDevice,
  closeConfirmModal,
} from "src/pages/campaigns/selection/selectionSlice";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { usePostCampaignsByCampaignCandidatesMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import useSelection from "../useSelection";

const ConfirmModal: FC<{ id: string }> = ({ id }) => {
  const { add } = siteWideMessageStore();
  const { isConfirmModalOpen } = useAppSelector((state) => state.selection);
  const { selectedDevices } = useSelection(id);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeConfirmModal());
  };
  const [selectDevices] = usePostCampaignsByCampaignCandidatesMutation();
  const confirm = async () => {
    try {
      const response = await selectDevices({
        campaign: id,
        body: Object.keys(selectedDevices).map((testerId) => ({
          tester_id: parseInt(testerId),
          device: parseInt(selectedDevices[testerId]),
        })),
      }).unwrap();
      if ("invalidTesters" in response) {
        add({
          type: "warning",
          message: `${response.invalidTesters?.length} tryber non sono stati aggiunti per un errore`,
        });
        console.warn(response.invalidTesters);
      }
      add({
        type: "success",
        message: `${response.results.length} tryber selezionati con successo`,
      });
      dispatch(clearSelectedDevice());
    } catch (e) {
      const error = e as any;
      let message = "La richiesta non è andata a buon fine";
      if ("data" in error) {
        // @ts-ignore
        message += `: ${error.data?.message}`;
      }
      add({ type: "danger", message });
    } finally {
      close();
    }
  };
  const Footer = () => {
    return (
      <BSGrid>
        <BSCol>
          <Button onClick={close} kind="primary" flat size="block">
            Cancella
          </Button>
        </BSCol>
        <BSCol>
          <Button
            onClick={confirm}
            kind="primary"
            flat
            size="block"
            disabled={false}
          >
            Ok
          </Button>
        </BSCol>
      </BSGrid>
    );
  };
  return (
    <Modal
      footer={<Footer />}
      size="small"
      isOpen={isConfirmModalOpen}
      onClose={close}
    >
      Sono stati selezionati {Object.keys(selectedDevices).length} tester, vuoi
      procedere con la selezione?
    </Modal>
  );
};

export default ConfirmModal;
