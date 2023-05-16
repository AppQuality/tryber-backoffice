import {
  Cell,
  CellTemplate,
  Compatible,
  Uncertain,
  getCellProperty,
} from "@silevis/reactgrid";
import * as React from "react";
import styled from "styled-components";
import "./style.css";

export interface GroupCell extends Cell {
  type: "group";
  value: number;
}

const GroupPill = styled.div<{ group: number }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  box-shadow: none;
  color: ${({ theme }) => theme.palette.primary};
  ${({ group, theme }) =>
    group === 1 &&
    `background-color: ${theme.colors.purple100};
    box-shadow: 0 0 0 1px ${theme.colors.purple200};
   `}
  ${({ group, theme }) =>
    group === 2 &&
    `background-color: ${theme.colors.yellow600};box-shadow: 0 0 0 1px ${theme.colors.yellow700};`}
  ${({ group, theme }) =>
    group === 3 &&
    `background-color: ${theme.colors.red200};box-shadow: 0 0 0 1px ${theme.colors.red300};`}
  ${({ group, theme }) =>
    group === 4 &&
    `background-color: ${theme.colors.blue300};box-shadow: 0 0 0 1px ${theme.colors.blue400};`}
`;

export class GroupCellTemplate implements CellTemplate<GroupCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<GroupCell>
  ): Compatible<GroupCell> {
    const group = getCellProperty(uncertainCell, "value", "number");

    const cell = { ...uncertainCell, value: group, text: group.toString() };
    return {
      ...cell,
      value: group,
      text: "group",
    };
  }

  isFocusable() {
    return false;
  }

  render(cell: Compatible<GroupCell>): React.ReactNode {
    return <GroupPill group={cell.value}>{cell.value}</GroupPill>;
  }
}
