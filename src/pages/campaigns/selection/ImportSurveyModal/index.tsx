import {
  Button,
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormikField,
  Modal,
  Select,
} from "@appquality/appquality-design-system";
import { useGetJotformsFormsQuery } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { closeSurveyModal } from "../selectionSlice";
import FormProvider from "./FormProvider";
import { QuestionsSelect } from "./QuestionsSelect";

const ImportSurveyModal = ({ id }: { id: string }) => {
  const { isSurveyModalOpen } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeSurveyModal());
  };
  const { data: jotforms, isLoading: isLoadingOptions } =
    useGetJotformsFormsQuery();
  const { data, isLoading, hasValue } = useSelectOptions();
  if (isLoadingOptions || !jotforms) {
    return null;
  }
  const emptyOption = { label: "empty", value: "empty" };
  const jotformsOptions = jotforms.map((jotform) => ({
    label: jotform.name,
    value: jotform.id.toString(),
  }));

  return (
    <Modal
      title="Import Jotform Dialog"
      size="large"
      isOpen={isSurveyModalOpen}
      onClose={close}
    >
      <FormProvider id={id}>
        <FormikField name="survey">
          {({ field, form }: FieldProps) => {
            return (
              <FormGroup>
                <Select
                  isDisabled={isLoading}
                  options={async (offset, search) => {
                    const options = await data(offset, field.value, search);
                    return options;
                  }}
                  data-qa="survey-select"
                  name={field.name}
                  label="Select a jotform"
                  onChange={(option) => {
                    if (option?.value) {
                      form.setFieldValue(field.name, option.value);
                    } else {
                      form.setFieldValue(field.name, "");
                    }
                  }}
                  value={
                    jotformsOptions.find(
                      (option) => option.value === field.value
                    ) || emptyOption
                  }
                />
                <ErrorMessage name={field.name} />
              </FormGroup>
            );
          }}
        </FormikField>
        <QuestionsSelect />
        <Button type="submit" data-qa="import-survey-apply-cta">
          Import
        </Button>
      </FormProvider>
    </Modal>
  );
};

const useSelectOptions = () => {
  const { data, isLoading } = useGetJotformsFormsQuery();

  if (isLoading) {
    return {
      data: (offset: number, search?: string) =>
        Promise.resolve({ results: [], more: false }),
      isLoading,
      hasValue: (value: SelectOptionType) => false,
    };
  }
  const jotforms = data || [];
  const options = jotforms.map((jf) => ({
    label: jf.name,
    value: jf.id.toString(),
  }));

  return {
    data: async (pageNumber: number, value: string, search?: string) => {
      const filteredOptions = options.filter(
        (o) =>
          o.label.toLowerCase().includes((search || "").toLowerCase()) &&
          o.value !== value
      );
      const results = filteredOptions.slice(
        pageNumber * 10,
        (pageNumber + 1) * 10
      );
      let more = results.length === 10;
      if (pageNumber === 0) {
        const selectedOption = options.find((o) => o.value === value);
        if (selectedOption) {
          results.unshift(selectedOption);
          more = results.length === 11;
        }
      }
      return {
        results,
        more,
      };
    },
    isLoading,
    hasValue: (value: string) => {
      return options.some((o) => o.value === value);
    },
  };
};

export default ImportSurveyModal;
