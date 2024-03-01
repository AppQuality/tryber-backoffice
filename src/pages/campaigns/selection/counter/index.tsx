import useSelection from "../useSelection";

const Counter = ({ id }: { id: string }) => {
  const { selectedDevices } = useSelection(id);
  return <div>{Object.keys(selectedDevices).length} Tester selezionati</div>;
};

export default Counter;
