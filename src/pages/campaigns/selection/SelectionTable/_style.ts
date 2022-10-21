import styled from "styled-components";

export const StyledSelectionTable = styled.div<{ columns: number }>`
  .cell.highlighted {
    background-color: ${(p) => p.theme.colors.gray100};
  }

  .lastRowCell,
  .lastHeadCell {
    position: sticky;
    right: 0;
    background: white;
  }

  .table-scrollable {
    overflow: auto;
    .thead {
      min-width: 250px;
      &:nth-child(${(p) => p.columns}) {
        min-width: 55px;
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.xxl}) {
    .table-scrollable {
      .thead {
        &:nth-child(${(p) => p.columns - 5}) {
          min-width: 310px;
        }
        &:nth-child(${(p) => p.columns - 4}) {
          min-width: 148px;
        }
        &:nth-child(${(p) => p.columns - 3}) {
          min-width: 155px;
        }
        &:nth-child(${(p) => p.columns - 2}) {
          min-width: 180px;
        }
        &:nth-child(${(p) => p.columns - 1}) {
          min-width: 250px;
        }
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.xl}) and (max-width: ${(
      p
    ) => p.theme.grid.breakpoints.xxl}) {
    .table-scrollable {
      overflow: auto;
      .thead {
        &:nth-child(${(p) => p.columns - 5}) {
          min-width: 280px;
        }
        &:nth-child(${(p) => p.columns - 4}) {
          min-width: 120px;
        }
        &:nth-child(${(p) => p.columns - 3}) {
          min-width: 125px;
        }
        &:nth-child(${(p) => p.columns - 2}) {
          min-width: 150px;
        }
        &:nth-child(${(p) => p.columns - 1}) {
          min-width: 250px;
        }
      }
    }
  }

  @media (max-width: ${(p) => p.theme.grid.breakpoints.xl}) {
    .table-scrollable {
      overflow: auto;
      .thead {
        &:nth-child(${(p) => p.columns - 5}) {
          min-width: 250px;
        }
        &:nth-child(${(p) => p.columns - 4}) {
          min-width: 90px;
        }
        &:nth-child(${(p) => p.columns - 3}) {
          min-width: 95px;
        }
        &:nth-child(${(p) => p.columns - 2}) {
          min-width: 120px;
        }
        &:nth-child(${(p) => p.columns - 1}) {
          min-width: 250px;
        }
      }
    }
  }
`;
