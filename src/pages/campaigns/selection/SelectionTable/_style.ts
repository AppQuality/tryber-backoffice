import styled from "styled-components";

export const StyledSelectionTable = styled.div`
  .cell.highlighted {
    background-color: ${(p) => p.theme.colors.gray100};
  }

  .table-scrollable {
    overflow: auto;
    .thead {
      min-width: max-content;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.xxl}) {
    .table-scrollable {
      .thead {
        &:nth-child(1) {
          min-width: 310px;
        }
        &:nth-child(2) {
          min-width: 148px;
        }
        &:nth-child(3) {
          min-width: 155px;
        }
        &:nth-child(4) {
          min-width: 180px;
        }
        &:nth-child(5) {
          min-width: 330px;
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
        &:nth-child(2) {
          min-width: 120px;
        }
        &:nth-child(3) {
          min-width: 125px;
        }
        &:nth-child(4) {
          min-width: 150px;
        }
        &:nth-child(5) {
          min-width: 300px;
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
        &:nth-child(2) {
          min-width: 90px;
        }
        &:nth-child(3) {
          min-width: 95px;
        }
        &:nth-child(4) {
          min-width: 120px;
        }
        &:nth-child(5) {
          min-width: 275px;
        }
      }
    }
  }
`;
