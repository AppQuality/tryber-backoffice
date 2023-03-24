import * as React from "react";
import { getCellProperty } from "@silevis/reactgrid";
import { Cell, CellTemplate, Compatible, Uncertain } from "@silevis/reactgrid";
import { icons } from "@appquality/appquality-design-system";
import "./style.css";

const { TrophyFill } = icons;

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
    return cell.value ? <TrophyFill /> : null;
  }
}
