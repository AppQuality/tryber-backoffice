import { styled } from "styled-components";

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${(p) => p.theme.grid.sizes[3]};
`;

export const DateTimeFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 147px;
  grid-column-gap: ${(p) => p.theme.grid.sizes[2]};
`;
