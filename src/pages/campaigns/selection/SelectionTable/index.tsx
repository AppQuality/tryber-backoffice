import { Pagination, Table } from "@appquality/appquality-design-system";
import { FC, useMemo } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import { useAppDispatch, useAppSelector } from "src/store";
import { StyledSelectionTable } from "./_style";
import { useColumns } from "./useColumns";

const SelectionTable: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { rows, totalRows, isFetching, isLoading } = useTableRows(id);
  const columns = useColumns();
  const {
    devicesPerPage,
    currentPage,
    tableColumns: additionalColumns,
  } = useAppSelector((state) => state.selection);

  const tableColumns = useMemo(
    () => [
      columns[0],
      columns[1],
      ...additionalColumns,
      ...columns.slice(2, columns.length - 2),
      columns[columns.length - 2],
    ],
    [columns, additionalColumns]
  );

  return (
    <StyledSelectionTable columns={tableColumns.length} isFetching={isFetching}>
      <Table
        data-testid="selection-table"
        dataSource={rows}
        columns={tableColumns}
        isLoading={isLoading}
        className="aq-mb-3 table-scrollable"
      />
      <Pagination
        maxPages={Math.ceil(totalRows / devicesPerPage)}
        current={currentPage}
        onPageChange={(page) => {
          dispatch(changeTablePage({ newPage: page }));
        }}
      />
    </StyledSelectionTable>
  );
};

export default SelectionTable;
