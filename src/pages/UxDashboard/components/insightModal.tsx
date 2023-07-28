import { Button, Modal } from "@appquality/appquality-design-system";
import { InsightForm } from "./InsightForm";
import { useAppDispatch, useAppSelector } from "src/store";
import { resetInsight } from "../uxDashboardSlice";
import styled from "styled-components";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const StyledModal = styled(Modal)`
  .modal {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }
`;

export const InsightModal = ({ isOpen, onClose }: InsightModalProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(resetInsight());
    onClose();
  };
  const ModalFooter = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          data-qa="discard-new-insight"
          type="danger"
          flat
          onClick={handleClose}
          className="aq-mr-3"
        >
          Discard
        </Button>
        <Button data-qa="save-new-insight" flat onClick={handleClose}>
          Save
        </Button>
      </div>
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
