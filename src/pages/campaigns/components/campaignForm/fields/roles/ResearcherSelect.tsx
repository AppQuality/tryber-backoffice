import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

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
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Researcher" />
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

export default ResearcherSelect;
