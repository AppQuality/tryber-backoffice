import { Table } from "@appquality/appquality-design-system";
import { Dispatch, FC, useEffect, useMemo } from "react";
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import { Pagination } from "@appquality/appquality-design-system";
import { useAppSelector, useAppDispatch } from "src/store";
import { changeTablePage } from "src/pages/campaigns/selection/selectionSlice";
import { StyledSelectionTable } from "./_style";

const SelectionTable: FC<{
  id: string;
  mail: string[];
  provider: string[];
  os: string[];
  bhLevel: string[];
  uxLevel: string[];
  age: { min: number; max: number };
}> = ({ id, mail, provider, os, bhLevel, uxLevel, age }) => {
  const dispatch: Dispatch<any> = useAppDispatch();
  const { rows, totalRows, isFetching } = useTableRows(id);
  const { devicesPerPage, currentPage, tableColumns } = useAppSelector(
    (state) => state.selection
  );
  const _rows = useMemo(() => {
    //let newRows = [...rows];
    let newRows = [...rows.filter((row) => row.key.includes("_0"))];

    newRows = newRows.filter((row) => {
      return mail.length > 0
        ? mail.includes(row["524-0"])
          ? { ...row }
          : null
        : { ...row };
    });

    newRows = newRows.filter((row) => {
      return provider.length > 0 && typeof row["525-1"] === "string"
        ? row["525-1"]
            .split(", ")
            .some((singleProvider: any) => provider.includes(singleProvider))
          ? { ...row }
          : null
        : { ...row };
    });

    newRows = newRows.filter((row) => {
      return os.length > 0
        ? os.includes(row.deviceOs)
          ? { ...row }
          : null
        : { ...row };
    });

    newRows = newRows.filter((row) => {
      return bhLevel.length > 0 && typeof row.exp === "string"
        ? bhLevel.includes(row.exp)
          ? { ...row }
          : null
        : { ...row };
    });

    newRows = newRows.filter((row) => {
      return uxLevel.length > 0 && typeof row.level === "string"
        ? uxLevel.includes(row.level)
          ? { ...row }
          : null
        : { ...row };
    });

    newRows = newRows.filter((row) => {
      return row.age >= age.min && row.age <= age.max ? { ...row } : null;
    });

    return newRows;
  }, [rows, mail, provider, os, bhLevel, uxLevel, age]);
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
