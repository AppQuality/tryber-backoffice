import {
  Cell,
  CellChange,
  CellLocation,
  DefaultCellTypes,
  Id,
  MenuOption,
  ReactGrid,
  Row,
  SelectionMode,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useEffect, useState } from "react";
import { CustomHeader } from "./customHeader";
import { UneditableCell, UneditableCellTemplate } from "./UneditableCell";
import { Column, Item } from "./types";
import { TableWrapper } from "./TableWrapper";
import { StarCell, StarCellTemplate } from "./StarCell";
import { NumberCellTemplate } from "./NumberCell";
import { SelectCell, SelectCellTemplate } from "./SelectCell";

function EdiTable<T extends { [key: string]: string | number | boolean }>({
  columnHeaders,
  columns,
  bottom,
  subHeader,
  data,
  onRowChange,
  onChange,
  className,
  contextMenu,
  stickyLeftColumns,
}: {
  columnHeaders?: { height?: number; items: { name: string; span?: number }[] };
  columns: Column<T>[];
  subHeader?: Item<T>[];
  bottom?: Item<T>[];
  data: Item<T>[];
  onRowChange?: (row: T, oldRow?: T) => void;
  onChange?: (changes: CellChange[]) => boolean | void;
  className?: string;
  contextMenu?: { label: string; handler: (rows: Item<T>[]) => void }[];
  stickyLeftColumns?: number;
}) {
  const [items, setItems] = useState<Item<T>[]>([]);
  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div style={{ display: "flex" }}>
      <TableWrapper className={className}>
        <ReactGrid
          enableRangeSelection
          enableRowSelection
          enableFillHandle
          onCellsChanged={(changes) => {
            if (onChange) {
              if (onChange(changes) === false) return;
            }
            setItems((prevItems) => {
              changes.forEach(
                (
                  change: CellChange<(DefaultCellTypes & Cell) | SelectCell>
                ) => {
                  const column = columns.find(
                    (c) => c.name === change.columnId
                  );
                  if (!column) return;
                  const index = change.rowId as number;
                  const oldRow = { ...prevItems[index] };
                  const fieldName = column.key as keyof T;
                  if (change.newCell.type === "text") {
                    prevItems[index][fieldName] = change.newCell
                      .text as T[keyof T];
                  }
                  if (change.newCell.type === "select") {
                    prevItems[index][fieldName] = change.newCell
                      .text as T[keyof T];
                  }
                  if (change.newCell.type === "number") {
                    prevItems[index][fieldName] = change.newCell
                      .value as T[keyof T];
                  }
                  const row = prevItems[index];
                  onRowChange && onRowChange(row, oldRow);
                }
              );
              return [...prevItems];
            });
          }}
          stickyLeftColumns={stickyLeftColumns}
          stickyTopRows={columnHeaders ? 2 : 1}
          rows={[
            ...getTopHeader(columnHeaders),
            {
              rowId: "header",
              height: 35,
              cells: columns.map((column, idx) => ({
                type: "customHeader",
                text: column.name,
                children: column.children,
                columnId: column.key,
                className: "header headercell",
              })),
            },
            ...getSubHeader<T>(columns, subHeader),
            ...getRowItems<T>(columns, items),
            ...getBottomItems<T>(columns, bottom),
          ]}
          columns={columns.map((c) => ({
            columnId: c.name,
            width: c.width ? c.width : 75,
          }))}
          customCellTemplates={{
            uneditable: new UneditableCellTemplate(),
            customHeader: new CustomHeader(),
            star: new StarCellTemplate(),
            number: new NumberCellTemplate(),
            select: new SelectCellTemplate(),
          }}
          onContextMenu={
            contextMenu
              ? (
                  selectedRowIds: Id[],
                  selectedColIds: Id[],
                  selectionMode: SelectionMode,
                  menuOptions: MenuOption[],
                  selectedRanges: CellLocation[][]
                ): MenuOption[] => {
                  const rows = Array.from(
                    new Set(...[selectedRanges.flat().map((r) => r.rowId)])
                  );
                  const selectedData = rows.map((r) => data[r as number]);
                  return contextMenu.map((item) => ({
                    id: item.label,
                    label: item.label,
                    handler: () => {
                      item.handler(selectedData);
                    },
                  }));
                }
              : undefined
          }
        />
      </TableWrapper>
    </div>
  );
}

export default EdiTable;

function getRowItems<T extends { [key: string]: string | number | boolean }>(
  columns: Column<T>[],
  items: Item<T>[]
) {
  return items.map<
    Row<DefaultCellTypes | UneditableCell | StarCell | SelectCell>
  >((item, idx) => ({
    rowId: idx,
    cells: columns.map((column, idx) => {
      if (Object.keys(item).includes(column.key)) {
        const value = item[column.key as keyof typeof item];
        if (column.type === "uneditable") {
          const textValue =
            typeof value === "string" ? value : value.toString();
          return {
            type: "uneditable",
            text: column.renderer ? column.renderer(value) : textValue,
            style: item.style || {},
          };
        } else if (column.type === "star" && typeof value === "boolean") {
          return {
            type: "star",
            value: value ? 1 : 0,
            text: "",
            style: item.style || {},
          };
        } else if (column.type === "select") {
          const textValue =
            typeof value === "string" ? value : value.toString();
          return {
            type: "select",
            value: value,
            text: textValue,
            options: column.values,
            onChange: (value) => {
              if (!column.onChange) return;
              if (column.key in item) {
                column.onChange(
                  {
                    ...item,
                    [column.key]: value,
                  },
                  value
                );
              }
            },
            style: item.style || {},
          };
        } else if (typeof value === "number") {
          return {
            type: "number",
            value,
            text: column.renderer ? column.renderer(value) : undefined,
            groupId: column.key,
            style: item.style || {},
          };
        } else if (typeof value === "string") {
          return {
            type: "text",
            text: value,
            groupId: column.key,
            style: item.style || {},
          };
        }
        throw new Error("Unknown type");
      }
      throw new Error("Unknown column");
    }),
  }));
}

function getBottomItems<T extends { [key: string]: string | number | boolean }>(
  columns: Column<T>[],
  bottom?: Item<T>[]
) {
  return bottom
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
    : [];
}

function getSubHeader<T extends { [key: string]: string | number | boolean }>(
  columns: Column<T>[],
  subHeader?: Item<T>[]
) {
  return subHeader
    ? subHeader.map((b, idx) => ({
        rowId: `subheader-${idx}`,
        cells: columns.map((column, idx) => {
          if (Object.keys(b).includes(column.key)) {
            const value = b[column.key as keyof typeof b];
            const text =
              typeof value === "number"
                ? `${value}`
                : typeof value === "boolean"
                ? ""
                : value;
            return {
              type: "header",
              text: column.renderer ? column.renderer(value) : text,
              columnId: column.key,
              className: "subheader headercell",
            };
          }
          throw new Error("Unknown column");
        }),
      }))
    : [];
}

function getTopHeader(columnHeaders?: {
  height?: number;
  items: { name: string; span?: number }[];
}) {
  if (!columnHeaders) return [];
  const topHeader: {
    rowId: string;
    height?: number;
    cells: DefaultCellTypes[];
  }[] = [
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
  return topHeader;
}
