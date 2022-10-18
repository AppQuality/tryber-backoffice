import { Button } from "@appquality/appquality-design-system";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { openConfirmModal } from "src/pages/campaigns/selection/selectionSlice";

const ConfirmButton: FC = () => {
  const { selectedDevices } = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();

  const confirmSelection = () => {
    dispatch(openConfirmModal());
  };
  return (
    <div style={{ textAlign: "right" }}>
      <Button
        onClick={confirmSelection}
        disabled={Object.keys(selectedDevices).length < 1}
      >
        Conferma selezioni
      </Button>
    </div>
  );
};

export default ConfirmButton;
