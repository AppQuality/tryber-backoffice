import FormProvider from "./FormProvider";
import { MultiSelect, Input, Label } from "@appquality/unguess-design-system";
import { Field as FormikField, FieldProps } from "formik";
import { Field } from "@zendeskgarden/react-forms";
import { PageTemplate } from "src/features/PageTemplate";
import TextInput from "./TextInput";

const NewCampaign = () => {
  const options = [
    { id: 1, label: "android" },
    { id: 2, label: "ios" },
  ];

  return (
    <PageTemplate type="unguess">
      <FormProvider>
        <FormikField name="project">
          {({ field }: FieldProps) => (
            <TextInput name={field.name} label="Project" value={field.value} />
          )}
        </FormikField>
        <Field>
          <Label htmlFor="testType">Test Type</Label>
          <Input type="text" name="testType" id="testType" />
        </Field>
        <Field>
          <Label htmlFor="tester">Tester</Label>
          <Input type="text" name="tester" id="tester" />
        </Field>
        <Field>
          <Label htmlFor="startDate">Start Date</Label>
          <Input type="text" name="startDate" id="startDate" />
        </Field>
        <Label htmlFor="deviceList">Device List</Label>
        <MultiSelect options={options} size="small" i18n={{}} />
      </FormProvider>
    </PageTemplate>
  );
};

export default NewCampaign;
