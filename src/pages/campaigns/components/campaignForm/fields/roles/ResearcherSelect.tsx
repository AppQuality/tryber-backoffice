import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import Select from "../components/Select";

const ResearcherSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: researcher } = useGetCampaignsOwnersQuery();

  const options = researcher
    ? researcher.map((researcher) => ({
        id: researcher.id.toString(),
        label: `${researcher.name} ${researcher.surname}`,
      }))
    : [];

  return (
    <FormikField name="researcher">
      {({ field }: FieldProps) => (
        <Select
          options={options}
          name={field.name}
          label="Researcher"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default ResearcherSelect;
