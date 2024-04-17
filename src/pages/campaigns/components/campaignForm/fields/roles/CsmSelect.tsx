import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import Select from "../components/Select";

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
        <Select
          options={options}
          name={field.name}
          label="CSM"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default CsmSelect;
