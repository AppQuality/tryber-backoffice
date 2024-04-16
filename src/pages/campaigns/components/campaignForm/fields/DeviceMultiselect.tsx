import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import Multiselect from "./components/MultiSelect";
import { ChangeEvent, useMemo, useState } from "react";

const DeviceMultiselect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const [deviceTypes, setDeviceTypes] = useState<string[]>([
    "Smartphone",
    "PC",
  ]);
  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });

  const deviceTypeOptions = useMemo(() => {
    const uniqueDeviceTypes = new Set(devices?.map((device) => device.type));
    return Array.from(uniqueDeviceTypes);
  }, [devices]);

  const osOptions = useMemo(
    () =>
      (devices
        ? devices
            .filter((device) => deviceTypes.includes(device.type))
            .map(
              (
                device: GetDevicesByDeviceTypeOperatingSystemsApiResponse[number]
              ) => ({
                id: device.id.toString(),
                label: `${device.type} - ${device.name}`,
              })
            )
        : []
      ).sort((a: { label: string }, b: { label: string }) =>
        a.label.localeCompare(b.label)
      ),
    [devices, deviceTypes]
  );

  // handle deviceTypes change
  const handleDeviceTypesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (deviceTypes.includes(value)) {
      setDeviceTypes(deviceTypes.filter((deviceType) => deviceType !== value));
    } else {
      setDeviceTypes([...deviceTypes, value]);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Choose Device Type:</legend>
        {deviceTypeOptions.map((deviceType) => (
          <div key={deviceType}>
            <input
              type="checkbox"
              id={deviceType}
              name={deviceType}
              value={deviceType}
              checked={deviceTypes.includes(deviceType)}
              onChange={handleDeviceTypesChange}
            />
            <label htmlFor={deviceType}>{deviceType}</label>
          </div>
        ))}
      </fieldset>
      <FormikField name="deviceList">
        {({ field }: FieldProps) => (
          <Multiselect
            options={[{ id: "all", label: "All" }, ...osOptions]}
            name={field.name}
            label="Operative System List"
            value={field.value.length ? field.value : ["all"]}
            emptyOption="Select"
            onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
          />
        )}
      </FormikField>
    </div>
  );
};

export default DeviceMultiselect;
