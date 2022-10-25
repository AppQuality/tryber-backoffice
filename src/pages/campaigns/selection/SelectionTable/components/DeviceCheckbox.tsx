import { Checkbox } from "@appquality/appquality-design-system";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  checkUserDevice,
  deselectDevice,
} from "src/pages/campaigns/selection/selectionSlice";

const DeviceCheckbox: FC<{ userId: string; deviceId: string }> = ({
  userId,
  deviceId,
}) => {
  const { selectedDevices } = useAppSelector((state) => state.selection);
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
