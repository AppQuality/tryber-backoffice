import { useFormikContext } from "formik";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { useCallback, useMemo } from "react";
import { groupDevicesByType } from "../groupByType";
import {
  Dropdown,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldWrapper } from "./FieldWrapper";
import { Option } from "./SelectField";

interface OsMultiselectProps {
  options: Option[];
  label: string;
}
const OsMultiselect = ({ options, label }: OsMultiselectProps) => {
  const {
    values: { deviceList },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

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
      <FormLabel htmlFor={label} label={label} />
      <Dropdown
        isMulti
        options={options}
        value={options.filter((option) => deviceList.includes(option.value))}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

const DeviceMultiselect = () => {
  const {
    setFieldValue,
    values: { deviceTypes, deviceList },
  } = useFormikContext<NewCampaignValues>();
  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });

  const deviceTypeOptions = useMemo(() => {
    const uniqueDeviceTypes = new Set(devices?.map((device) => device.type));
    return Array.from(uniqueDeviceTypes).map((deviceType) => ({
      value: deviceType,
      label: deviceType,
    }));
  }, [devices]);

  const osOptions = useMemo(() => {
    if (!devices) return {};
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
    return groupDevicesByType(devicesOptions);
  }, [devices]);

  // handle deviceTypes change
  const handleDeviceTypesChange = useCallback(
    (option) => {
      if (option === null || option === undefined) {
        setFieldValue("deviceTypes", []);
        setFieldValue("deviceList", []);
        return;
      }
      if (deviceTypes.includes(option.value)) {
        setFieldValue(
          "deviceTypes",
          deviceTypes.filter((deviceType) => deviceType !== option.value)
        );
        setFieldValue(
          "deviceList",
          deviceList.filter(
            (device) =>
              !osOptions[option.value].map((os) => os.value).includes(device)
          )
        );
      } else {
        setFieldValue("deviceTypes", [...deviceTypes, option.value]);
        setFieldValue("deviceList", [
          ...deviceList,
          ...osOptions[option.value].map((os) => os.value),
        ]);
      }
    },
    [deviceTypes, deviceList, osOptions, setFieldValue]
  );

  return (
    <>
      <FormGroup>
        <FormLabel htmlFor="deviceTypes" label="Choose Device Type" />
        <Dropdown
          name="deviceTypes"
          id="deviceTypes"
          isMulti
          options={deviceTypeOptions}
          value={deviceTypeOptions.filter((opt) =>
            deviceTypes.includes(opt.value)
          )}
          onChange={handleDeviceTypesChange}
        />
      </FormGroup>
      <FieldWrapper>
        {deviceTypes.map((deviceType) => {
          if (!(deviceType in osOptions)) return null;
          return (
            <OsMultiselect options={osOptions[deviceType]} label={deviceType} />
          );
        })}
      </FieldWrapper>
    </>
  );
};

export default DeviceMultiselect;
