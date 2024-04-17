import { FormEventHandler } from "react";
import { Option } from "./MultiSelect";

const Select = ({
  name,
  value,
  options,
  label,
  emptyOption,
  onChange,
}: {
  name: string;
  value: string;
  options: Option[];
  label: string;
  emptyOption?: string;
  onChange: FormEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange}>
        <option disabled value="0" selected={value === "0"}>
          {emptyOption ? emptyOption : "Select"}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            selected={value === option.id}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default Select;
