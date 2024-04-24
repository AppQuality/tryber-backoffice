import { useFormikContext } from "formik";
import {
  GetDevicesByDeviceTypeOperatingSystemsApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../../FormProvider";
import { useCallback, useMemo } from "react";
import { groupDevicesByType } from "../../groupByType";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldWrapper } from "../FieldWrapper";
import { Option } from "../SelectField";
import { OsMultiselect } from "./OsMultiselect";

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
    return groupDevicesByType(
      devices.map((device) => ({
        value: device.id.toString(),
        label: device.name,
        type: device.type,
      }))
    );
  }, [devices]);

  // handle deviceTypes change
  const handleDeviceTypesChange = useCallback(
    (option) => {
      if (option === null || option === undefined) {
        setFieldValue("deviceTypes", []);
        setFieldValue("deviceList", []);
        return;
      }
      if (Array.isArray(option)) {
        option.forEach((opt) => {
          if (deviceTypes.includes(opt.value)) {
            setFieldValue(
              "deviceTypes",
              deviceTypes.filter((deviceType) => deviceType !== opt.value)
            );
            setFieldValue(
              "deviceList",
              deviceList.filter(
                (device) =>
                  !osOptions[opt.value].map((os) => os.value).includes(device)
              )
            );
          } else {
            setFieldValue("deviceTypes", [...deviceTypes, opt.value]);
            setFieldValue("deviceList", [
              ...deviceList,
              ...osOptions[opt.value].map((os) => os.value),
            ]);
          }
        });
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
        <ErrorMessage name="deviceTypes" />
      </FormGroup>
      <FieldWrapper>
        {deviceTypes.map((deviceType) => {
          if (!(deviceType in osOptions)) return null;
          return <OsMultiselect deviceType={deviceType} />;
        })}
        <ErrorMessage name="deviceList" />
      </FieldWrapper>
    </>
  );
};

export default DeviceMultiselect;
