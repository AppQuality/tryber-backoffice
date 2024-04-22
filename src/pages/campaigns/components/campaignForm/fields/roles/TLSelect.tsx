import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const TlSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: tl } = useGetCampaignsOwnersQuery();

  const options = tl
    ? tl.map((tl) => ({
        id: tl.id.toString(),
        label: `${tl.name} ${tl.surname}`,
      }))
    : [];

  return (
    <FormikField name="tl">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="TL" />
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

export default TlSelect;
