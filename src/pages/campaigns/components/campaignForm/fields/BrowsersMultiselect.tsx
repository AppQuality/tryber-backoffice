import { useFormikContext, Field as FormikField, FieldProps } from "formik";
import { useGetBrowsersQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import Multiselect from "./components/MultiSelect";
import { useMemo } from "react";

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
      })),
    [browsers]
  );
  return (
    <FormikField name="browsersList">
      {({ field }: FieldProps) => (
        <Multiselect
          options={options || []}
          label="Browsers"
          value={field.value}
          emptyOption="Select"
          onChange={(e) => {
            if (!e.currentTarget.value) {
              setFieldValue(field.name, []);
              return;
            }
            if (browsersList?.includes(e.currentTarget.value)) {
              setFieldValue(
                field.name,
                browsersList.filter((v) => v !== e.currentTarget.value)
              );
              return;
            }
            setFieldValue(field.name, [
              ...(browsersList || []),
              e.currentTarget.value,
            ]);
          }}
        />
      )}
    </FormikField>
  );
};

export default BrowsersMultiselect;
