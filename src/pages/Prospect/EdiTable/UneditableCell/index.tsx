import * as React from "react";
import { getCellProperty } from "@silevis/reactgrid";
import { Cell, CellTemplate, Compatible, Uncertain } from "@silevis/reactgrid";
import "./style.css";

export interface UneditableCell extends Cell {
  type: "uneditable";
  text: string;
  placeholder?: string;
  validator?: (text: string) => boolean;
  renderer?: (text: string) => React.ReactNode;
  errorMessage?: string;
}

export class UneditableCellTemplate implements CellTemplate<UneditableCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<UneditableCell>
  ): Compatible<UneditableCell> {
    const text = getCellProperty(uncertainCell, "text", "string");
    let placeholder: string | undefined;
    try {
      placeholder = getCellProperty(uncertainCell, "placeholder", "string");
    } catch {
      placeholder = "";
    }
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    return { ...uncertainCell, text, value, placeholder };
  }

  getClassName(cell: Compatible<UneditableCell>): string {
    const isValid = cell.validator ? cell.validator(cell.text) : true;
    const className = cell.className ? cell.className : "";
    return `${isValid ? "valid" : "invalid"} ${
      cell.placeholder && cell.text === "" ? "placeholder" : ""
    } ${className}`;
  }

  render(cell: Compatible<UneditableCell>): React.ReactNode {
    const isValid = cell.validator ? cell.validator(cell.text) : true;
    const cellText = cell.text || cell.placeholder || "";
    const textToDisplay =
      !isValid && cell.errorMessage ? cell.errorMessage : cellText;
    return cell.renderer ? cell.renderer(textToDisplay) : textToDisplay;
  }
}
