import { Modal } from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { closeConfirmModal } from "src/pages/campaigns/selection/selectionSlice";

const ConfirmModal = () => {
  const { isConfirmModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeConfirmModal());
  };
  return (
    <Modal isOpen={isConfirmModalOpen} onClose={close}>
      pippo
    </Modal>
  );
};

export default ConfirmModal;
