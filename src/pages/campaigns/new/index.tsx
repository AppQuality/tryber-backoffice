import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { PageTemplate } from "src/features/PageTemplate";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import Multiselect from "./components/MultiSelect";
import TextInput from "./components/TextInput";

const Content = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const options = [
    { id: 1, label: "android" },
    { id: 2, label: "ios" },
  ];

  return (
    <>
      <FormikField name="project">
        {({ field }: FieldProps) => (
          <TextInput
            name={field.name}
            label="Project"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>

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
          <TextInput
            name={field.name}
            label="Start date"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>

      <FormikField name="deviceList">
        {({ field }: FieldProps) => (
          <Multiselect
            options={options}
            name={field.name}
            label="Device List"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>
    </>
  );
};

const NewCampaign = () => {
  return (
    <PageTemplate type="unguess">
      <FormProvider>
        <Content />
      </FormProvider>
    </PageTemplate>
  );
};

export default NewCampaign;
