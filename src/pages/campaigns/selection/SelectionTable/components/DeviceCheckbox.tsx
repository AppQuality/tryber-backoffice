import { Checkbox } from "@appquality/appquality-design-system";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { checkUserDevice } from "src/pages/campaigns/selection/selectionSlice";

const DeviceCheckbox: FC<{ userId: string; deviceId: string }> = ({
  userId,
  deviceId,
}) => {
  const { selectedDevices } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();
  const onChange = () => {
    dispatch(checkUserDevice({ userId, deviceId }));
  };
  const isChecked = selectedDevices[userId] === deviceId;
  return (
    <input
      type="checkbox"
      name={userId}
      id={deviceId}
      checked={isChecked}
      onChange={onChange}
    />
  );
};

export default DeviceCheckbox;
