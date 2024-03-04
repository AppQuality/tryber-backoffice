import { Pagination, Table } from "@appquality/appquality-design-system";
import { FC } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import { useAppDispatch, useAppSelector } from "src/store";
import { StyledSelectionTable } from "./_style";
import SelectAllFirstDevicesCheckbox from "./components/SelectAllFirstDevicesCheckbox";

const SelectionTable: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { rows, totalRows, isFetching, isLoading } = useTableRows(id);
  const { devicesPerPage, currentPage, tableColumns } = useAppSelector(
    (state) => state.selection
  );
  return (
    <StyledSelectionTable columns={tableColumns.length} isFetching={isFetching}>
      <div className="aq-mb-3">
        Select all first-user-device
        <SelectAllFirstDevicesCheckbox
          data-testid="selectAllFirstDevices"
          campaignId={id}
        />
      </div>
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
