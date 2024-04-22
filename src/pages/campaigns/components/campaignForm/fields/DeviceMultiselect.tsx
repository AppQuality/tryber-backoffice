import { useFormikContext } from "formik";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { ChangeEvent, useMemo } from "react";
import { groupDevicesByType } from "../groupByType";
import {
  Dropdown,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

export interface Option {
  id: string;
  label: string;
}
interface OsMultiselectProps {
  options: Option[];
  label: string;
}
const OsMultiselect = ({ options, label }: OsMultiselectProps) => {
  const {
    values: { deviceList },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

  return (
    <FormGroup>
      <FormLabel htmlFor={label} label={label} />
      <Dropdown
        options={options}
        value={options.filter((option) => deviceList.includes(option.id))}
        onChange={(value) => {
          if (!value) return;
          if (deviceList.includes(value.id)) {
            setFieldValue(
              "deviceList",
              deviceList.filter((v) => v !== value.id)
            );
          } else {
            setFieldValue("deviceList", [...deviceList, value.id]);
          }
        }}
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
    return Array.from(uniqueDeviceTypes);
  }, [devices]);

  const osOptions = useMemo(() => {
    if (!devices) return {};
    const devicesOptions = devices
      .map(
        (
          device: GetDevicesByDeviceTypeOperatingSystemsApiResponse[number]
        ) => ({
          id: device.id.toString(),
          label: device.name,
          type: device.type,
        })
      )
      .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
    return groupDevicesByType(devicesOptions);
  }, [devices]);

  // handle deviceTypes change
  const handleDeviceTypesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (deviceTypes.includes(value)) {
      setFieldValue(
        "deviceTypes",
        deviceTypes.filter((deviceType) => deviceType !== value)
      );
      setFieldValue(
        "deviceList",
        deviceList.filter(
          (device) => !osOptions[value].map((os) => os.id).includes(device)
        )
      );
    } else {
      setFieldValue("deviceTypes", [...deviceTypes, value]);
      setFieldValue("deviceList", [
        ...deviceList,
        ...osOptions[value].map((os) => os.id),
      ]);
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
      <fieldset>
        <legend>Operative System:</legend>
        {deviceTypes.map((deviceType) => {
          if (!(deviceType in osOptions)) return null;
          return (
            <OsMultiselect options={osOptions[deviceType]} label={deviceType} />
          );
        })}
      </fieldset>
    </div>
  );
};

export default DeviceMultiselect;
