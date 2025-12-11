import styled from "styled-components";

/**
 * Full-width horizontal divider
 */
export const HorizontalDivider = styled.div<{
  margin?: string;
  color?: string;
}>`
  width: 100%;
  height: 1px;
  background: ${({ color }) => color || "#ccc"};
  margin: ${({ margin }) => margin || "12px 0"};
`;

/**
 * Vertical divider with configurable height
 */
export const VerticalDivider = styled.div<{ height?: string; color?: string }>`
  width: 1px;
  height: ${({ height }) => height || "3em"};
  background: ${({ color }) => color || "#ccc"};
`;
