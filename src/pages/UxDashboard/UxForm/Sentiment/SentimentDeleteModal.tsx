import { Button, Modal, ModalBody } from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { setSentimentDeleteModalOpen } from "../../uxDashboardSlice";

const ModalFooter = () => {
  return (
    <div>
      <Button>Confirm</Button>
    </div>
  );
};

const SentimentDeleteModal = () => {
  const { isSentimentDeleteModalOpen } = useAppSelector(
    (state) => state.uxDashboard
  );
  const dispatch = useAppDispatch();
  const closeModal = async () => {
    dispatch(setSentimentDeleteModalOpen(false));
  };

  return (
    <Modal
      size="small"
      isOpen={isSentimentDeleteModalOpen}
      onClose={closeModal}
      footer={<ModalFooter />}
    >
      <ModalBody>
        <div data-qa="delete-sentiment-chart-modal">Modal content</div>
      </ModalBody>
    </Modal>
  );
};

export default SentimentDeleteModal;
