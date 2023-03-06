import styled from "styled-components";

const StyledSeverity = styled.span<{ severityId: number }>`
  ${({ severityId: id }) => id === 1 && `color: #800208;`}
  ${({ severityId: id }) => id === 2 && `color: #C78430;`}
${({ severityId: id }) => id === 3 && `color: #024780;`}
${({ severityId: id }) => id === 4 && `color: #02807A;`}
font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-transform: capitalize;
`;

const Severity = ({ severity }: { severity: { id: number; name: string } }) => {
  return (
    <StyledSeverity severityId={severity.id}>{severity.name}</StyledSeverity>
  );
};
export default Severity;
