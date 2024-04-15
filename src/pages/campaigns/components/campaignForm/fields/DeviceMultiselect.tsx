import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useGetDevicesByDeviceTypeOperatingSystemsQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import Multiselect from "./components/MultiSelect";

const DeviceMultiselect = () => {
  const { data } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const options = (
    data
      ? data.map((device) => ({
          id: device.id,
          label: `${device.type} - ${device.name}`,
        }))
      : []
  ).sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <FormikField name="deviceList">
        {({ field }: FieldProps) => (
          <Multiselect
            options={options}
            name={field.name}
            label="Device List"
            value={field.value}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>
    </>
  );
};

export default DeviceMultiselect;
