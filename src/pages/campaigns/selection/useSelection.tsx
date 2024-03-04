import { useAppSelector } from "src/store";
import useItems from "./useItems";

const useSelection = (id: string) => {
  const selectedDevices = useAppSelector(
    (state) => state.selection.selectedDevices
  );
  const { data, isFetching } = useItems(id, { withLimit: false });
  if (isFetching || !data || !data.results) {
    return { selectedDevices: {} };
  }

  const filteredTesters = data.results.map((item) => item.id.toString());

  return {
    selectedDevices: Object.keys(selectedDevices)
      .filter((key) => filteredTesters.includes(key))
      .reduce((obj, key) => {
        obj[key] = selectedDevices[key];
        return obj;
      }, {} as typeof selectedDevices),
  };
};

export default useSelection;
