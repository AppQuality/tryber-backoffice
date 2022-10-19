import {
  BSCol,
  BSGrid,
  Button,
  Modal,
} from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { closeConfirmModal } from "src/pages/campaigns/selection/selectionSlice";
import { usePostCampaignsByCampaignCandidatesMutation } from "src/services/tryberApi";
import { FC } from "react";
import siteWideMessageStore from "src/redux/siteWideMessages";

const ConfirmModal: FC<{ id: string }> = ({ id }) => {
  const { add } = siteWideMessageStore();
  const { isConfirmModalOpen, selectedDevices } = useAppSelector(
    (state) => state.selection
  );
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeConfirmModal());
  };
  const [selectDevices] = usePostCampaignsByCampaignCandidatesMutation();
  const confirm = async () => {
    const response = await selectDevices({
      campaign: id,
      body: Object.keys(selectedDevices).map((testerId) => ({
        tester_id: parseInt(testerId),
        device: parseInt(selectedDevices[testerId]),
      })),
    });
    if ("error" in response) {
      console.error(response.error);
      let message = "La richiesta non è andata a buon fine";
      if ("data" in response.error) {
        // @ts-ignore
        message += `: ${response.error.data?.message}`;
      }
      add({ type: "danger", message, expire: false });
    }
    if ("data" in response) {
      if ("invalidTesters" in response.data) {
        add({
          type: "warning",
          message: `${response.data.invalidTesters?.length} tryber non sono stati aggiunti per un errore`,
          expire: false,
        });
        console.warn(response.data.invalidTesters);
      }
      add({
        type: "success",
        message: `${response.data.results.length} tryber selezionati con successo`,
        expire: false,
      });
    }
  };
  const Footer = () => {
    return (
      <BSGrid>
        <BSCol>
          <Button onClick={close} type="primary" flat size="block">
            Cancella
          </Button>
        </BSCol>
        <BSCol>
          <Button
            onClick={confirm}
            type="primary"
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
