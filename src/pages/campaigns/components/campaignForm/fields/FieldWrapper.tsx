import { styled } from "styled-components";

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${(p) => p.theme.grid.sizes[3]};
`;
