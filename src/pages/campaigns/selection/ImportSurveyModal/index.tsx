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
import { useGetJotformsFormsQuery } from "src/services/tryberApi";
import FormProvider from "./FormProvider";
import { QuestionsSelect } from "./QuestionsSelect";

const ImportSurveyModal = () => {
  const { isSurveyModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSurveyModal());
  };
  const { data: jotforms } = useGetJotformsFormsQuery();
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
          {({ field, form }: FieldProps) => (
            <FormGroup>
              <Select
                options={jotformsOptions || [emptyOption]}
                data-qa="survey-select"
                name={field.name}
                label="select jotform"
                onChange={(option) => {
                  if (option?.value) {
                    form.setFieldValue(field.name, option.value);
                  } else {
                    form.setFieldValue(field.name, "");
                  }
                }}
                onBlur={() => {
                  form.setFieldTouched(field.name, true);
                }}
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
        <QuestionsSelect />
        <Button type="submit" data-qa="import-survey-apply-cta">
          Apply
        </Button>
      </FormProvider>
    </Modal>
  );
};

export default ImportSurveyModal;
