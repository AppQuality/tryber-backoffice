import { Table } from "@appquality/appquality-design-system";
import { columns } from "src/pages/campaigns/selection/SelectionTable/columns";
import { FC } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { Pagination } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import styled from "styled-components";

const StyledTable = styled.div`
  .cell.highlighted {
    background-color: ${(p) => p.theme.colors.gray100};
  }
`;

const SelectionTable: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { rows, totalRows, isFetching } = useTableRows(id);
  const { devicesPerPage, currentPage } = useAppSelector(
    (state) => state.selection
  );
  return (
    <StyledTable>
      <Table
        data-testid="selection-table"
        dataSource={rows}
        columns={columns}
        isLoading={isFetching}
        className="aq-mb-3"
      />
      <Pagination
        maxPages={Math.ceil(totalRows / devicesPerPage)}
        current={currentPage}
        onPageChange={(page) => {
          dispatch(changeTablePage({ newPage: page }));
        }}
      />
    </StyledTable>
  );
};

export default SelectionTable;
