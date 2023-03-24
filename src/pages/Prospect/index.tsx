import { useParams } from "react-router-dom";
import Table from "./Table";

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  return <Table id={id} />;
};

export default Prospect;
