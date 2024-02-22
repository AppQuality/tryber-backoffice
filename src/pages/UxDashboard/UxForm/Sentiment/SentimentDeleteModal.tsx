import { Button, Modal, ModalBody } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setSentimentDeleteModalOpen } from "../../uxDashboardSlice";
import { FormValuesInterface } from "../FormProvider";

const ModalFooterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ModalFooter = ({ close }: { close: () => void }) => {
  const { setFieldValue, submitForm } = useFormikContext<FormValuesInterface>();

  return (
    <ModalFooterWrapper>
      <Button
        data-qa="confirm-delete-sentiment-chart-button"
        onClick={close}
        flat
      >
        Cancel
      </Button>
      <Button
        data-qa="cancel-delete-sentiment-chart-button"
        onClick={() => {
          setFieldValue("sentiments", []);
          submitForm();
          close();
        }}
        kind="danger"
      >
        Confirm
      </Button>
    </ModalFooterWrapper>
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
      footer={<ModalFooter close={closeModal} />}
    >
      <ModalBody>
        <div data-qa="delete-sentiment-chart-modal">
          Vuoi davvero cancellare tutti i dati del sentiment chart?
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SentimentDeleteModal;
