import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import Select from "../components/Select";

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
        <Select
          options={options}
          name={field.name}
          label="TL"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default TlSelect;
