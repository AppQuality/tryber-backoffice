import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import { useGetDevicesByDeviceTypeOperatingSystemsQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../../FormProvider";
import { groupDevicesByType } from "../../groupByType";
import { FieldWrapper } from "../FieldWrapper";
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
    (options: Readonly<{ value: string; label: string }[]>) => {
      if (options === null || options === undefined) {
        setFieldValue("deviceTypes", []);
        setFieldValue("deviceList", []);
        return;
      }

      setFieldValue(
        "deviceTypes",
        options.map((opt) => opt.value)
      );

      const removedOs = deviceTypes
        .filter((opt) => !options.map((o) => o.value).includes(opt))
        .flatMap((deviceType) => osOptions[deviceType].map((os) => os.value));

      const addedOs = options
        .map((opt) => opt.value)
        .filter((opt) => !deviceTypes.includes(opt))
        .flatMap((deviceType) => osOptions[deviceType].map((os) => os.value));

      setFieldValue(
        "deviceList",
        deviceList
          .filter((device) => !removedOs.includes(device))
          .concat(addedOs)
      );
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
