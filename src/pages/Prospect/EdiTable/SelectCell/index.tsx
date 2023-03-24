import * as React from "react";
import styled from "styled-components";
import "./style.css";

import { isAlphaNumericKey, isNavigationKey } from "@silevis/reactgrid";
import { getCellProperty } from "@silevis/reactgrid";
import { keyCodes } from "@silevis/reactgrid";
import {
  Cell,
  CellTemplate,
  Compatible,
  Uncertain,
  UncertainCompatible,
} from "@silevis/reactgrid";
import { getCharFromKeyCode } from "@silevis/reactgrid";

export interface SelectCell extends Cell {
  type: "select";
  options: string[];
  text: string;
  placeholder?: string;
  onChange?: (cell: string) => void;
  validator?: (text: string) => boolean;
  renderer?: (text: string) => React.ReactNode;
  errorMessage?: string;
}

const StyledSelect = styled.select`
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;

export class SelectCellTemplate implements CellTemplate<SelectCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<SelectCell>
  ): Compatible<SelectCell> {
    const text = getCellProperty(uncertainCell, "text", "string");
    const options = getCellProperty(uncertainCell, "options", "object");
    let placeholder: string | undefined;
    try {
      placeholder = getCellProperty(uncertainCell, "placeholder", "string");
    } catch {
      placeholder = "";
    }
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    return { ...uncertainCell, text, value, placeholder, options };
  }

  update(
    cell: Compatible<SelectCell>,
    cellToMerge: UncertainCompatible<SelectCell>
  ): Compatible<SelectCell> {
    if (cell.onChange && cell.text !== cellToMerge.text) {
      cell.onChange(cellToMerge.text);
    }
    return this.getCompatibleCell({
      ...cell,
      text: cellToMerge.text,
      placeholder: cellToMerge.placeholder,
    });
  }

  handleKeyDown(
    cell: Compatible<SelectCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean
  ): { cell: Compatible<SelectCell>; enableEditMode: boolean } {
    const char = getCharFromKeyCode(keyCode, shift);
    if (
      !ctrl &&
      !alt &&
      isAlphaNumericKey(keyCode) &&
      !(shift && keyCode === keyCodes.SPACE)
    )
      return {
        cell: this.getCompatibleCell({
          ...cell,
          text: shift ? char : char.toLowerCase(),
        }),
        enableEditMode: true,
      };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  getClassName(cell: Compatible<SelectCell>, isInEditMode: boolean): string {
    const isValid = cell.validator ? cell.validator(cell.text) : true;
    const className = cell.className ? cell.className : "";
    return `${isValid ? "valid" : "invalid"} ${
      cell.placeholder && cell.text === "" ? "placeholder" : ""
    } ${className}`;
  }

  render(
    cell: Compatible<SelectCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<SelectCell>, commit: boolean) => void
  ): React.ReactNode {
    return (
      <StyledSelect
        defaultValue={cell.text}
        onChange={(e) => {
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            true
          );
        }}
        onBlur={(e) => {
          onCellChanged(
            this.getCompatibleCell(cell),
            (e as any).view?.event?.keyCode !== keyCodes.ESCAPE
          );
        }}
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder={cell.placeholder}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
      >
        {cell.options.map((option) => (
          <option selected={option === cell.text} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    );
  }
}
