import { FormEventHandler } from "react";
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

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const DateInput = ({
  name,
  value,
  label,
  onChange,
  ...props
}: DateInputProps) => {
  return (
    <StyledInput>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type="date"
        name={name}
        id={name}
        onChange={onChange}
        {...props}
      />
    </StyledInput>
  );
};
export default DateInput;
