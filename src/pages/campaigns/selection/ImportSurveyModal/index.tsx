import {
  Button,
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormikField,
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
        <FormikField name="survey">
          {({ field }: FieldProps) => (
            <FormGroup>
              <Select
                options={jotformsOptions || [emptyOption]}
                data-qa="survey-select"
                name={field.name}
                label="select jotform"
                value={
                  jotformsOptions?.find(
                    (option) => option.value === field.value
                  ) || emptyOption
                }
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          )}
        </FormikField>
        <FormikField name="testerIdQuestion">
          {({ field }: FieldProps) => (
            <FormGroup>
              <Select
                options={[emptyOption]}
                data-qa="testerId-select"
                isDisabled={true}
                name={field.name}
                label="select testerId question"
                value={emptyOption}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          )}
        </FormikField>
        <Button type="submit" data-qa="import-survey-apply-cta">
          Apply
        </Button>
      </FormProvider>
    </Modal>
  );
};

export default ImportSurveyModal;
