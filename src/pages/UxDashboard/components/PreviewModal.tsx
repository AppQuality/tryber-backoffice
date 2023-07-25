import { Button, Modal } from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { resetInsight } from "../uxDashboardSlice";
import styled from "styled-components";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
const StyledModal = styled(Modal)`
  .modal {
    width: calc(100vw - 2rem);
  }
`;

export const PreviewModal = ({ isOpen, onClose, title }: PreviewModalProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(resetInsight());
    onClose();
  };
  const ModalFooter = () => {
    return (
      <>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleClose}>Publish</Button>
      </>
    );
  };

  return (
    <StyledModal
      data-qa="ux-dashboard-preview"
      isOpen={isOpen}
      title={title}
      onClose={handleClose}
      footer={<ModalFooter />}
    >
      Preview Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos{" "}
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos{" "}
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos{" "}
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos{" "}
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos{" "}
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
      Quisquam, quos voluptatem. Quisquam, quos voluptatem. Quisquam, quos
      <br />
      voluptatem. Quisquam, quos voluptatem. Quisquam, quos voluptatem.
      <br />
    </StyledModal>
  );
};
