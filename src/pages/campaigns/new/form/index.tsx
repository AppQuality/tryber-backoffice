import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import FormProvider from "src/pages/UxDashboard/UxForm/FormProvider";
import { NewCampaignValues } from "./FormProvider";
import CustomerSelect from "./fields/CustomerSelect";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import DateInput from "./fields/components/DateInput";
import TextInput from "./fields/components/TextInput";

const FormContent = () => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();

  return (
    <>
      {JSON.stringify(values)}
      <CustomerSelect />

      <FormikField name="testType">
        {({ field }: FieldProps) => (
          <TextInput
            name={field.name}
            label="Test Type"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>
      <FormikField name="tester">
        {({ field }: FieldProps) => (
          <TextInput
            name={field.name}
            label="Campaign Title (for tester)"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>
      <FormikField name="startDate">
        {({ field }: FieldProps) => (
          <DateInput
            name={field.name}
            label="Start date"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>

      <DeviceMultiselect />
    </>
  );
};

const Form = () => {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
};

export default Form;
