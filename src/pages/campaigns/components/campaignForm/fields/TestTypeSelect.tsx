import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import { useGetCampaignTypesQuery } from "src/services/tryberApi";
import Select from "./components/Select";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const TestTypeSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: testTypes } = useGetCampaignTypesQuery();

  const options = testTypes
    ? testTypes.map((testType) => ({
        id: testType.id.toString(),
        label: testType.name,
      }))
    : [];

  return (
    <FormikField name="testType">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Test Type" />
          <Dropdown
            id={field.name}
            options={options}
            name={field.name}
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default TestTypeSelect;
