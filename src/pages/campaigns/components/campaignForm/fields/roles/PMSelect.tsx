import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import Select from "../components/Select";

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
        <Select
          options={options}
          name={field.name}
          label="PM"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default PmSelect;
