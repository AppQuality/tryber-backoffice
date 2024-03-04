import {
  BSCol,
  BSGrid,
  Button,
  Modal,
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
            Cancella
          </Button>
        </BSCol>
        <BSCol>
          <Button
            onClick={() => {
              dispatch(closeFormModal());
              dispatch(openSurveyModal());
            }}
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
      isOpen={isFormModalOpen}
      onClose={close}
    >
      {`A questa Selection è già collegato il form con id: ${preselectionFormId}. Vuoi sovrascriverlo e collegare un nuovo form?`}
    </Modal>
  );
};

export default ConfirmFormModal;
