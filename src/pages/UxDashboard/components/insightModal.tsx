import { Modal } from "@appquality/appquality-design-system";
import { InsightForm } from "./InsightForm";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const InsightModal = ({ isOpen, onClose, title }: InsightModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="large">
      <InsightForm />
    </Modal>
  );
};
