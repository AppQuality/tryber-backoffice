import { Table, Text } from "@appquality/appquality-design-system";
import { FC } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { Pagination } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import tryber from "src/pages/campaigns/selection/SelectionTable/assets/tryber.png";
import bg from "src/pages/campaigns/selection/SelectionTable/assets/bg.png";
import { StyledSelectionTable } from "./_style";

const SelectionTable: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { rows, totalRows, isFetching, error } = useTableRows(id);
  const { devicesPerPage, currentPage, tableColumns } = useAppSelector(
    (state) => state.selection
  );

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
        }}
      >
        <img
          alt="error 403"
          className="aq-mb-3"
          src={tryber}
          style={{ maxWidth: 100 }}
        />
        <Text style={{ textAlign: "center" }}>
          <strong>Non c'è niente da vedere qui</strong>
          <br />
          Sembrerebbe che tu non abbia i permessi per accedere a questa pagina
        </Text>
      </div>
    );
  }
  return (
    <StyledSelectionTable>
      <Table
        data-testid="selection-table"
        dataSource={rows}
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
