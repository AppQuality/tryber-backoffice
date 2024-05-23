import {
  Dropdown,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../../FormProvider";
import { groupDevicesByType } from "../../groupByType";
import { Option } from "../SelectField";

interface OsMultiselectProps {
  deviceType: string;
  id: string;
}

const useOptions = (deviceType: string) => {
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

  return options;
};

const getPlural = (deviceType: string) => {
  const lastChar = deviceType.slice(-1);
  const suffix =
    lastChar === "s"
      ? "es"
      : lastChar === "y"
      ? "ies"
      : lastChar === "h"
      ? "es"
      : "s";

  return `${deviceType}${suffix}`;
};

export const OsMultiselect = ({ deviceType, id }: OsMultiselectProps) => {
  const {
    values: { deviceList },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();
  const options = useOptions(deviceType);

  const allOption = useMemo(
    () => ({ value: "all", label: `All ${getPlural(deviceType)}` }),
    [deviceType]
  );

  const getOptions = () => {
    return [allOption, ...options];
  };
  const getValue = useCallback(() => {
    const values = options.filter((option) =>
      deviceList.includes(option.value)
    );
    if (options.length === values.length) return [allOption];
    return values;
  }, [deviceList, options, allOption]);

  const handleChange = useCallback(
    (selectedOptions: Readonly<{ label: string; value: string }[]>) => {
      if (selectedOptions === null || selectedOptions === undefined) {
        setFieldValue("deviceList", []);
        return;
      }

      const currentValue = getValue();

      if (
        !currentValue.some((opt) => opt.value === allOption.value) &&
        selectedOptions.some((opt) => opt.value === allOption.value)
      ) {
        selectedOptions = options;
      }

      selectedOptions = selectedOptions.filter(
        (opt) => opt.value !== allOption.value
      );
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
    [deviceList, setFieldValue, options, allOption.value, getValue]
  );

  return (
    <FormGroup>
      <FormLabel
        htmlFor={deviceType}
        label={
          <>
            {deviceType} <span className="aq-text-danger">*</span>
          </>
        }
      />
      <Dropdown
        id={deviceType}
        isMulti
        options={getOptions()}
        value={getValue()}
        onChange={handleChange}
      />
    </FormGroup>
  );
};
