import {
  BSCol,
  BSGrid,
  Button,
  Modal,
} from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { closeConfirmModal } from "src/pages/campaigns/selection/selectionSlice";
import { usePostCampaignsByCampaignCandidatesMutation } from "src/services/tryberApi";

const ConfirmModal = () => {
  const { isConfirmModalOpen, selectedDevices } = useAppSelector(
    (state) => state.selection
  );
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeConfirmModal());
  };
  const [selectDevices] = usePostCampaignsByCampaignCandidatesMutation();
  const confirm = async () => {
    //await selectDevices()
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
      sono stati selezionati {Object.keys(selectedDevices).length} tester, vuoi
      procedere con la selezione?
    </Modal>
  );
};

export default ConfirmModal;
