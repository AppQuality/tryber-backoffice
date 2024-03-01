import {
  Button,
  Form,
  Modal,
  Select,
} from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { closeSurveyModal } from "../selectionSlice";
import {
  useGetJotformsFormsByFormIdQuestionsQuery,
  useGetJotformsFormsQuery,
} from "src/services/tryberApi";
import FormProvider from "./FormProvider";

const ImportSurveyModal = () => {
  const { isSurveyModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSurveyModal());
  };
  const { data: jotforms } = useGetJotformsFormsQuery();
  const { data: questions } = useGetJotformsFormsByFormIdQuestionsQuery({
    formId: "formId",
  });
  const emptyOption = { label: "empty", value: "empty" };
  const jotformsOptions = jotforms?.map((jotform) => ({
    label: jotform.name,
    value: jotform.id,
  }));
  return (
    <Modal
      title="Import Jotform Dialog"
      size="large"
      isOpen={isSurveyModalOpen}
      onClose={close}
    >
      <FormProvider>
        <Select
          options={jotformsOptions || [emptyOption]}
          data-qa="survey-select"
          name="survey-select"
          label="select jotform"
          value={jotformsOptions || [emptyOption]}
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
      </FormProvider>
    </Modal>
  );
};

export default ImportSurveyModal;
