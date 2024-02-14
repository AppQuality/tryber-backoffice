import { Table } from "@appquality/appquality-design-system";
import { FC, useEffect, useMemo } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { Pagination } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import { StyledSelectionTable } from "./_style";

const SelectionTable: FC<{ id: string; mail: string[] }> = ({ id, mail }) => {
  const dispatch = useAppDispatch();
  const { rows, totalRows, isFetching } = useTableRows(id);
  const { devicesPerPage, currentPage, tableColumns } = useAppSelector(
    (state) => state.selection
  );
  const _rows = useMemo(
    () =>
      rows.filter((row) => {
        return mail.length > 0
          ? mail.includes(row["524-0"])
            ? { ...row }
            : null
          : { ...row };
      }),
    [rows, mail]
  );
  return (
    <StyledSelectionTable columns={tableColumns.length}>
      <Table
        data-testid="selection-table"
        dataSource={_rows}
        columns={tableColumns}
        isLoading={isFetching}
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
