import {
  BSCol,
  BSGrid,
  Button,
  Modal,
  Text,
} from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { closeFormModal, openSurveyModal } from "../selectionSlice";

const ConfirmFormModal = ({
  preselectionFormId,
}: {
  preselectionFormId?: number;
}) => {
  const { isFormModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeFormModal());
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
            onClick={() => {
              dispatch(closeFormModal());
              dispatch(openSurveyModal());
            }}
            kind="primary"
            size="block"
            disabled={false}
          >
            Yes, proceed with the new import
          </Button>
        </BSCol>
      </BSGrid>
    );
  };
  return (
    <Modal
      footer={<Footer />}
      size="large"
      isOpen={isFormModalOpen}
      onClose={close}
    >
      <Text>
        <strong>Are you sure you want to continue?</strong>
        <div>
          This tester selection already has a form associated with it (id:{" "}
          {preselectionFormId}). Proceeding with the import of a new survey will
          replace the existing form, overwriting it.
        </div>
      </Text>
    </Modal>
  );
};

export default ConfirmFormModal;
