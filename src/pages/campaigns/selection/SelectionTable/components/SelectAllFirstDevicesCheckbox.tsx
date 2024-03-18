import { Checkbox } from "@appquality/appquality-design-system";
import { FC } from "react";
import {
  checkUserDevice,
  clearSelectedDevice,
} from "src/pages/campaigns/selection/selectionSlice";
import { useAppDispatch } from "src/store";
import useItems from "../../useItems";

const SelectAllFirstDevicesCheckbox: FC<{ campaignId: string }> = ({
  campaignId,
}) => {
  const dispatch = useAppDispatch();

  const { data, isFetching } = useItems(campaignId, { withLimit: false });
  if (isFetching || !data || !data.results) {
    return null; // Return null instead of an object
  }
  const candidatedDevices = data.results.map((tester) => ({
    testerId: tester.id.toString(),
    deviceId: tester.devices.length > 0 ? tester.devices[0].id.toString() : "",
  }));

  return (
    <Checkbox
      name="selectAllFirstDevices"
      id="selectAllFirstDevices"
      onChange={(e) => {
        dispatch(clearSelectedDevice());

        if (e.target.checked) {
          candidatedDevices.forEach((device) => {
            dispatch(
              checkUserDevice({
                userId: device.testerId,
                deviceId: device.deviceId,
              })
            );
          });
        }
      }}
    />
  );
};

export default SelectAllFirstDevicesCheckbox;
