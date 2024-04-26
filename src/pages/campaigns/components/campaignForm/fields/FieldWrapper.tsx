import { styled } from "styled-components";

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${(p) => p.theme.grid.sizes[3]};
  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.grid.sizes[4]};
  }
`;
