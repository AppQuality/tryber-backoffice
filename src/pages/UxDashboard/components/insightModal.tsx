import { Button, Modal } from "@appquality/appquality-design-system";
import { InsightForm } from "./InsightForm";
import { useAppDispatch } from "src/store";
import { resetInsight } from "../uxDashboardSlice";
import styled from "styled-components";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
const StyledModal = styled(Modal)`
  .modal {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }
`;

export const InsightModal = ({ isOpen, onClose, title }: InsightModalProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(resetInsight());
    onClose();
  };
  const ModalFooter = () => {
    return (
      <>
        <Button data-qa="discard-new-insight" onClick={handleClose}>
          Discard
        </Button>
        <Button data-qa="save-new-insight" onClick={handleClose}>
          Save
        </Button>
      </>
    );
  };
  return (
    <StyledModal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnClickOutside={false}
      footer={<ModalFooter />}
    >
      <InsightForm />
    </StyledModal>
  );
};
