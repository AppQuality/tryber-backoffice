export type Column<T> = {
  name: string;
  key: Exclude<keyof T, number | symbol>;
  type?: "number" | "text" | "uneditable" | undefined;
  width?: number | undefined;
  children?: React.ReactNode;
};

export type CellStyle = {
  style?: { backgroundColor: string; borderColor: string };
};
export type Item<T> = T & CellStyle;
