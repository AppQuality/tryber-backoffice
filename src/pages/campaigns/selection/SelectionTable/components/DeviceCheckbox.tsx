import { Checkbox } from "@appquality/appquality-design-system";
import { FC } from "react";
import {
  checkUserDevice,
  deselectDevice,
} from "src/pages/campaigns/selection/selectionSlice";
import { useAppDispatch } from "src/store";
import useSelection from "../../useSelection";

const DeviceCheckbox: FC<{
  campaignId: string;
  userId: string;
  deviceId: string;
}> = ({ campaignId, userId, deviceId }) => {
  const { selectedDevices } = useSelection(campaignId);
  const dispatch = useAppDispatch();
  const onChange = () => {
    if (isChecked) {
      dispatch(deselectDevice({ userId }));
    } else {
      dispatch(checkUserDevice({ userId, deviceId }));
    }
  };
  const isChecked = selectedDevices[userId] === deviceId;
  return (
    <Checkbox
      name={userId}
      id={deviceId}
      checked={isChecked}
      onChange={onChange}
    />
  );
};

export default DeviceCheckbox;
