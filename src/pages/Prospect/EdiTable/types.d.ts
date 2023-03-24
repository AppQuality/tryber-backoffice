import { Cell } from "@silevis/reactgrid";
import { SelectCell } from "./SelectCell";

export type Column<T> = {
  name: string;
  key: Exclude<keyof T, number | symbol>;
  width?: number | undefined;
  children?: React.ReactNode;
  renderer?: (item: Item<T>[keyof T]) => string;
} & (
  | {
      type: "number" | "text" | "uneditable" | "star";
    }
  | {
      type: "select";
      values: string[];
      onChange?: (cell: Item<T>, newValue: string) => void;
    }
);

export type CellStyle = {
  style?: { backgroundColor?: string; borderColor?: string; color?: string };
};
export type Item<T> = T & CellStyle;
