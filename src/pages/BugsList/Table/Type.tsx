import styled from "styled-components";

const StyledType = styled.span`
  text-transform: capitalize;
`;

const Type = ({ type }: { type: { id: number; name: string } }) => {
  return <StyledType>{type.name}</StyledType>;
};
export default Type;
