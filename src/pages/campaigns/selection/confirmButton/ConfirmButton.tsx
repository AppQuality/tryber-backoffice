import { Button } from "@appquality/appquality-design-system";
import { openConfirmModal } from "src/pages/campaigns/selection/selectionSlice";
import { useAppDispatch } from "src/store";
import useSelection from "../useSelection";

const ConfirmButton = ({ id }: { id: string }) => {
  const { selectedDevices } = useSelection(id);
  const dispatch = useAppDispatch();

  const confirmSelection = () => {
    dispatch(openConfirmModal());
  };
  return (
    <div style={{ textAlign: "right" }}>
      <Button
        kind="primary"
        flat
        onClick={confirmSelection}
        disabled={Object.keys(selectedDevices).length < 1}
      >
        Confirm selected
      </Button>
    </div>
  );
};

export default ConfirmButton;
