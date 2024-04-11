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

const TextInput = ({
  name,
  value,
  label,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
}) => {
  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    onChange(e.currentTarget.value);
  };
  return (
    <StyledInput>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type="text"
        name={name}
        id={name}
        onChange={handleChange}
      />
    </StyledInput>
  );
};
export default TextInput;
