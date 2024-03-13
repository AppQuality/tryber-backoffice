import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import { useGetJotformsFormsByFormIdQuestionsQuery } from "src/services/tryberApi";
import { ImportSurveyValues } from "./FormProvider";

export const QuestionsSelect = () => {
  const { values } = useFormikContext<ImportSurveyValues>();

  const { data: questions } = useGetJotformsFormsByFormIdQuestionsQuery({
    formId: values.survey,
  });

  const options = useMemo(() => {
    return (
      questions?.map((question) => ({
        label: question.title,
        value: question.name,
      })) || []
    );
  }, [questions]);
  const emptyOption = { label: "Select", value: "" };
  return (
    <FormikField name="testerIdQuestion">
      {({ field, form }: FieldProps) => (
        <FormGroup>
          <Select
            options={options || [emptyOption]}
            data-qa="testerId-select"
            isDisabled={values.survey === ""}
            name={field.name}
            onChange={(option) => {
              if (option?.value) {
                form.setFieldValue(field.name, option.value);
              } else {
                form.setFieldValue(field.name, "");
              }
            }}
            label="Identify the question related to the Tester ID"
            value={
              options?.find((question) => question.value === field.value) ||
              emptyOption
            }
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};
