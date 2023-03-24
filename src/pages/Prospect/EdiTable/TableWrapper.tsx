import styled from "styled-components";

export const TableWrapper = styled.div`
  padding-bottom: 20px;
  .reactgrid .reactgrid-content {
    background: ${({ theme }) => theme.colors.white};
  }
  .reactgrid-content .rg-pane .rg-cell.subheader,
  .rg-cell {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  }
  .rg-cell.rg-customHeader-cell,
  .rg-cell.rg-header-cell {
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    padding: 0;
  }
  .rg-celleditor,
  .rg-celleditor-input,
  .rg-celleditor input {
    border: none;
  }

  .reactgrid-content .rg-pane .rg-cell.headercell {
    display: grid;
  }
  .reactgrid-content .rg-pane .rg-cell.header,
  .reactgrid-content .rg-pane .rg-cell.topheader {
  }
  .reactgrid-content .rg-pane .rg-cell.subheader {
    text-align: right;
  }
`;
