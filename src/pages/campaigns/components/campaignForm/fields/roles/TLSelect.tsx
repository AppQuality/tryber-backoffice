import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useGetUsersByRoleByRoleQuery } from "src/services/tryberApi";

const TlSelect = () => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();
  const { data: tl } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = tl
    ? tl.results
        .filter((tl) => !values.researcher?.includes(tl.id.toString()))
        .map((tl) => ({
          value: tl.id.toString(),
          label: `${tl.name} ${tl.surname}`,
        }))
    : [];

  return (
    <FormikField name="tl">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="TL" />
          <Dropdown
            isMulti
            options={options}
            name={field.name}
            value={options.filter((o) => field.value.includes(o.value))}
            onChange={(value) =>
              setFieldValue(
                field.name,
                value.map((v) => v.value)
              )
            }
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default TlSelect;
