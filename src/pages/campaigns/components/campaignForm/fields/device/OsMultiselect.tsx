import {
  FormGroup,
  FormLabel,
  Dropdown,
} from "@appquality/appquality-design-system";
import { useCallback, useMemo } from "react";
import { NewCampaignValues } from "../../FormProvider";
import { useFormikContext } from "formik";
import { Option } from "../SelectField";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { groupDevicesByType } from "../../groupByType";

interface OsMultiselectProps {
  deviceType: string;
}
export const OsMultiselect = ({ deviceType }: OsMultiselectProps) => {
  const {
    values: { deviceList },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<NewCampaignValues>();

  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });

  const options = useMemo(() => {
    if (!devices) return [];
    const devicesOptions = devices
      .map(
        (
          device: GetDevicesByDeviceTypeOperatingSystemsApiResponse[number]
        ) => ({
          value: device.id.toString(),
          label: device.name,
          type: device.type,
        })
      )
      .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
    return groupDevicesByType(devicesOptions)[deviceType] || [];
  }, [deviceType, devices]);

  const handleChange = useCallback(
    (selectedOptions) => {
      if (
        selectedOptions === null ||
        selectedOptions === undefined ||
        !Array.isArray(selectedOptions)
      ) {
        setFieldValue("deviceList", []);
        return;
      }
      const deSelected = options.filter(
        (device) =>
          !selectedOptions.map((opt) => opt.value).includes(device.value)
      );
      // deviceList also has devices from other types
      const allDevices = new Set([
        ...deviceList,
        ...selectedOptions.map((opt) => opt.value),
      ]);
      deSelected.forEach((device) => {
        allDevices.delete(device.value);
      });
      setFieldValue("deviceList", Array.from(allDevices));
    },
    [deviceList, setFieldValue, options]
  );

  return (
    <FormGroup>
      <FormLabel htmlFor={deviceType} label={deviceType} />
      <Dropdown
        id={deviceType}
        isMulti
        options={options}
        value={options.filter((option) => deviceList.includes(option.value))}
        onChange={handleChange}
      />
    </FormGroup>
  );
};
