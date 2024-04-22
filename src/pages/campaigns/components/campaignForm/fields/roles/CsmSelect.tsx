import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import {
  ErrorMessage,
  FormGroup,
  Dropdown,
  FormLabel,
} from "@appquality/appquality-design-system";

const CsmSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: csm } = useGetCampaignsOwnersQuery();

  const options = csm
    ? csm.map((csm) => ({
        id: csm.id.toString(),
        label: `${csm.name} ${csm.surname}`,
      }))
    : [];

  return (
    <FormikField name="csm">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="CSM" />
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

export default CsmSelect;
