import { FormEventHandler } from "react";

const Select = ({
  name,
  value,
  options,
  label,
  emptyOption,
  onChange,
}: {
  name: string;
  value: number;
  options: { id: number; label: string }[];
  label: string;
  emptyOption?: string;
  onChange: (value: number) => void;
}) => {
  const handleChange: FormEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.currentTarget.value));
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={handleChange}>
        <option disabled value="0" selected={value === 0}>
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
