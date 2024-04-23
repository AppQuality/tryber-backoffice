import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const PmSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: pm } = useGetCampaignsOwnersQuery();

  const options = pm
    ? pm.map((pm) => ({
        id: pm.id.toString(),
        label: `${pm.name} ${pm.surname}`,
      }))
    : [];

  return (
    <FormikField name="pm">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="PM" />
          <Dropdown
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

export default PmSelect;
