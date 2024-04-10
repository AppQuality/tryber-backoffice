import { useFormikContext } from "formik";
import { NewCampaignValues } from "./FormProvider";
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
}: {
  name: string;
  value: string;
  label: string;
}) => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    setFieldValue(name, e.currentTarget.value);
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
