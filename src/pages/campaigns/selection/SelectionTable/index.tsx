import { Table } from "@appquality/appquality-design-system";
import { columns } from "src/pages/campaigns/selection/SelectionTable/columns";
import { FC } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";

const SelectionTable: FC<{ id: string }> = ({ id }) => {
  const { rows, isFetching, error } = useTableRows(id);

  return (
    <>
      <Table
        data-testid="selection-table"
        dataSource={rows}
        columns={columns}
        isLoading={isFetching}
      />
    </>
  );
};

export default SelectionTable;
