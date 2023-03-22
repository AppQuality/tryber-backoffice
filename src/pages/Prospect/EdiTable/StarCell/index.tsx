import * as React from "react";
import { getCellProperty } from "@silevis/reactgrid";
import { Cell, CellTemplate, Compatible, Uncertain } from "@silevis/reactgrid";
import "./style.css";

export interface StarCell extends Cell {
  type: "star";
  value: number;
}

export class StarCellTemplate implements CellTemplate<StarCell> {
  getCompatibleCell(uncertainCell: Uncertain<StarCell>): Compatible<StarCell> {
    const text = getCellProperty(uncertainCell, "value", "number");

    const value = text ? 1 : 0;
    const cell = { ...uncertainCell, value, text: value.toString() };
    return {
      ...cell,
      value: text ? 1 : 0,
      text: "star",
    };
  }

  isFocusable() {
    return false;
  }

  render(cell: Compatible<StarCell>): React.ReactNode {
    return cell.value ? (
      <span style={{ fontSize: "30px" }}>★</span>
    ) : (
      <span style={{ fontSize: "30px", color: "#ccc" }}>★</span>
    );
  }
}
