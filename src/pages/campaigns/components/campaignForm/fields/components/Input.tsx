import { styled } from "styled-components";

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    margin-bottom: 0.5rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input = ({ name, label, ...props }: InputProps) => {
  return (
    <StyledInput>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} {...props} />
    </StyledInput>
  );
};
export default Input;
