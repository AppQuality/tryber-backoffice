import { useAppSelector } from "src/store";

const Counter = () => {
  const { selectedDevices } = useAppSelector((state) => state.selection);
  return <div>{Object.keys(selectedDevices).length} Tester selezionati</div>;
};

export default Counter;
