import { Modal } from "@appquality/appquality-design-system";
import { InsightForm } from "./InsightForm";
import { useAppDispatch } from "src/store";
import { resetInsight } from "../uxDashboardSlice";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const InsightModal = ({ isOpen, onClose, title }: InsightModalProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(resetInsight());
    onClose();
  };
  return (
    <Modal isOpen={isOpen} title={title} onClose={handleClose} size="large">
      <InsightForm />
    </Modal>
  );
};
