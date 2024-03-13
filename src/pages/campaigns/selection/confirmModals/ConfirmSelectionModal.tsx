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
          message: `${response.invalidTesters?.length} tryber were not added due to an error`,
        });
        console.warn(response.invalidTesters);
      }
      add({
        type: "success",
        message: `${response.results.length} tryber successfully selected`,
      });
      dispatch(clearSelectedDevice());
    } catch (e) {
      const error = e as any;
      let message = "The request was not successful";
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
            No, cancel
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
            Yes, confirm
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
      {Object.keys(selectedDevices).length} testers have been selected for the
      campaign. Do you want to confirm this selection?
    </Modal>
  );
};

export default ConfirmModal;
