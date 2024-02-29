import { Modal } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { closeSurveyModal } from "./selectionSlice";

const ImportSurveyModal = () => {
  const { isSurveyModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSurveyModal());
  };
  return (
    <Modal size="large" isOpen={isSurveyModalOpen} onClose={close}>
      <div id="import-survey-modal">pippo</div>
    </Modal>
  );
};

export default ImportSurveyModal;
