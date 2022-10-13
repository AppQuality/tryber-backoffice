import { Table } from "@appquality/appquality-design-system";
import { columns } from "src/pages/campaigns/selection/SelectionTable/columns";

const SelectionTable = () => {
  return (
    <>
      <Table data-testid="selection-table" dataSource={[]} columns={columns} />
    </>
  );
};

export default SelectionTable;
