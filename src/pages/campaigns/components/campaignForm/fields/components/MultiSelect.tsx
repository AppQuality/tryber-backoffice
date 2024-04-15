import { FormEventHandler } from "react";

export interface Option {
  id: string;
  label: string;
}
interface MultiselectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string[];
  options: Option[];
  label: string;
  emptyOption?: string;
}

const Multiselect = ({
  name,
  value,
  options,
  label,
  emptyOption,
  onChange,
  ...props
}: MultiselectProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        multiple
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className={value.includes(option.id) ? "selected" : "no"}
            selected={value.includes(option.id)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Multiselect;
