import styled from "styled-components";

export const StyledSelectionTable = styled.div<{
  columns: number;
  isFetching: boolean;
}>`
  ${(p) => p.isFetching && "opacity: 0.5; pointer-events: none;"}
  .selection-title {
    padding: 16px 16px 8px;
    border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
  }

  .cell.highlighted {
    background-color: ${(p) => p.theme.colors.gray100};
  }

  .lastRowCell,
  .lastHeadCell {
    position: sticky;
    right: 0;
    background: white;
    justify-content: right;
  }

  .lastHeadCell {
    z-index: 1;
  }

  .table-scrollable {
    overflow: auto;
    .thead {
      min-width: 250px;
      position: sticky;
      top: 0;
      background: white;

      &:nth-child(${(p) => p.columns}) {
        min-width: 55px;
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.xxl}) {
    .table-scrollable {
      .thead {
        &:nth-child(1) {
          min-width: 200px;
        }
        &:nth-child(${(p) => p.columns - 5}) {
          min-width: 50px;
        }
        &:nth-child(${(p) => p.columns - 3}),
        &:nth-child(${(p) => p.columns - 4}) {
          min-width: 100px;
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
        &:nth-child(1) {
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
        &:nth-child(1) {
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
