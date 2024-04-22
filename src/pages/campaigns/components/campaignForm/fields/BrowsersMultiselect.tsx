import { useFormikContext, Field as FormikField, FieldProps } from "formik";
import { useGetBrowsersQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { useMemo } from "react";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const BrowsersMultiselect = () => {
  const {
    values: { browsersList },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

  const { data: browsers } = useGetBrowsersQuery();

  const options = useMemo(
    () =>
      browsers?.results.map((browser) => ({
        id: browser.id.toString(),
        label: browser.name,
      })) || [],
    [browsers]
  );
  return (
    <FormikField name="browsersList">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Browsers" />
          <Dropdown
            options={options}
            value={options.filter((option) => field.value.includes(option.id))}
            onChange={(value) => {
              if (!value) {
                setFieldValue(field.name, []);
                return;
              }
            }}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default BrowsersMultiselect;
