import { HeaderCellTemplate, Cell, Span, Compatible } from "@silevis/reactgrid";
import React from "react";

export interface CustomHeaderCell extends Cell, Span {
  type: "header";
  text: string;
  children?: React.ReactElement;
}

export class CustomHeader extends HeaderCellTemplate {
  render(cell: Compatible<CustomHeaderCell>): React.ReactNode {
    return cell.children || cell.text;
  }
}
