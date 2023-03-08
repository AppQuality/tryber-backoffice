import styled from "styled-components";

const StyledStatus = styled.span<{ statusId: number }>`
  ${({ statusId: id, theme }) => id === 1 && `color: ${theme.palette.danger};`}
  ${({ statusId: id, theme }) => id === 2 && `color: ${theme.palette.success};`}
${({ statusId: id, theme }) => id === 3 && `color: ${theme.palette.info};`}
${({ statusId: id, theme }) => id === 4 && `color: ${theme.palette.warning};`}
  text-transform: capitalize;
`;

const Status = ({ status }: { status: { id: number; name: string } }) => {
  return <StyledStatus statusId={status.id}>{status.name}</StyledStatus>;
};
export default Status;
