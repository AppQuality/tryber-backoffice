import {
  Cell,
  CellChange,
  DefaultCellTypes,
  ReactGrid,
  Row,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useState } from "react";
import styled from "styled-components";
import { UneditableCell, UneditableCellTemplate } from "./UneditableCell";

const TableWrapper = styled.div`
  .rg-celleditor,
  .rg-celleditor-input,
  .rg-celleditor input {
    border: none;
  }

  .reactgrid-content .rg-pane .rg-cell.headercell {
    font-weight: bold;
    display: grid;
    text-align: center;
  }
  .reactgrid-content .rg-pane .rg-cell.header {
    background-color: red !important;
    color: white;
  }
  .reactgrid-content .rg-pane .rg-cell.topheader {
    background-color: green !important;
    color: white;
  }
`;

function EdiTable<T extends { [key: string]: string | number }>({
  columnHeaders,
  columns,
  bottom,
  data,
  onRowChange,
  onChange,
}: {
  columnHeaders?: { height?: number; items: { name: string; span?: number }[] };
  columns: {
    name: string;
    key: Exclude<keyof T, number | symbol>;
    type?: "number" | "text" | "uneditable";
    width?: number;
  }[];
  bottom?: Record<keyof T, string>[];
  data: T[];
  onRowChange?: (row: T) => void;
  onChange?: (changes: CellChange[]) => void;
}) {
  const [items, setItems] = useState<T[]>(data);

  const columnItems = columns.map((c) => ({
    columnId: c.name,
    width: c.width ? c.width : 75,
  }));

  let topHeader: {
    rowId: string;
    height?: number;
    cells: DefaultCellTypes[];
  }[] = [];
  if (columnHeaders) {
    topHeader = [
      {
        rowId: "topheader",
        height: columnHeaders.height,
        cells: [],
      },
    ];
    columnHeaders.items.forEach((h) => {
      topHeader[0].cells.push({
        type: "header",
        text: h.name,
        colspan: h.span,
        className: "topheader headercell",
      });
      if (h.span) {
        for (let i = 1; i < h.span; i++) {
          topHeader[0].cells.push({
            type: "header",
            text: "",
          });
        }
      }
    });
  }

  const rows: Row<Cell>[] = [
    ...topHeader,
    {
      rowId: "header",
      height: 40,
      cells: columns.map((column, idx) => ({
        type: "header",
        text: column.name,
        columnId: column.key,
        className: "header headercell",
      })),
    },
    ...items.map<Row<DefaultCellTypes | UneditableCell>>((item, idx) => ({
      rowId: idx,
      cells: columns.map((column, idx) => {
        if (Object.keys(item).includes(column.key)) {
          const value = item[column.key as keyof typeof item];
          if (column.type === "uneditable" && typeof value === "string") {
            return {
              type: "uneditable",
              text: value,
            };
          } else if (typeof value === "number") {
            return {
              type: "number",
              value,
              groupId: column.key,
            };
          } else if (typeof value === "string") {
            return {
              type: "text",
              text: value,
              groupId: column.key,
            };
          }
          throw new Error("Unknown type");
        }
        throw new Error("Unknown column");
      }),
    })),
    ...(bottom
      ? bottom.map((b, idx) => ({
          rowId: `bottom-${idx}`,
          cells: columns.map((column, idx) => {
            if (Object.keys(b).includes(column.key)) {
              return {
                type: "header",
                text:
                  typeof b[column.key as keyof typeof b] === "number"
                    ? `${b[column.key as keyof typeof b]}`
                    : b[column.key as keyof typeof b],
                columnId: column.key,
                className: "bottom headercell",
              };
            }
            throw new Error("Unknown column");
          }),
        }))
      : []),
  ];
  return (
    <TableWrapper>
      <ReactGrid
        enableRangeSelection
        enableFullWidthHeader
        enableFillHandle
        onCellsChanged={(changes) => {
          onChange && onChange(changes);
          setItems((prevItems) => {
            changes.forEach((change) => {
              const column = columns.find((c) => c.name === change.columnId);
              if (!column) return;
              const index = change.rowId as number;
              const fieldName = column.key as keyof T;
              if (change.newCell.type === "text") {
                prevItems[index][fieldName] = change.newCell.text as T[keyof T];
              }
              if (change.newCell.type === "number") {
                prevItems[index][fieldName] = change.newCell
                  .value as T[keyof T];
              }
              const row = prevItems[index];
              onRowChange && onRowChange(row);
            });
            return [...prevItems];
          });
        }}
        stickyTopRows={columnHeaders ? 2 : 1}
        rows={rows}
        columns={columnItems}
        customCellTemplates={{ uneditable: new UneditableCellTemplate() }}
      />
    </TableWrapper>
  );
}

export default EdiTable;
