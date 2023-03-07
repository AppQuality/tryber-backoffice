import styled from "styled-components";

const StyledType = styled.span<{ typeId: number }>`
  text-transform: capitalize;
`;

const Type = ({ type }: { type: { id: number; name: string } }) => {
  return <StyledType typeId={type.id}>{type.name}</StyledType>;
};
export default Type;
