import { Button, Modal, Select } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { closeSurveyModal } from "./selectionSlice";

const ImportSurveyModal = () => {
  const { isSurveyModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSurveyModal());
  };
  const emptyOption = { label: "empty", value: "empty" };
  return (
    <Modal
      title="Import Jotform Dialog"
      size="large"
      isOpen={isSurveyModalOpen}
      onClose={close}
    >
      <div id="import-survey-modal">
        <Select
          options={[emptyOption]}
          data-qa="survey-select"
          name="survey-select"
          label="select jotform"
          value={emptyOption}
        />
        <Select
          options={[emptyOption]}
          data-qa="testerId-select"
          isDisabled={true}
          name="testerId-select"
          label="select testerId question"
          value={emptyOption}
        />
        <Button data-qa="import-survey-apply-cta">Apply</Button>
      </div>
    </Modal>
  );
};

export default ImportSurveyModal;
