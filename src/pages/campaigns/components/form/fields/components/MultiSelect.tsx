import { FormEventHandler } from "react";

const Multiselect = ({
  name,
  value,
  options,
  label,
  emptyOption,
  onChange,
}: {
  name: string;
  value: number[];
  options: { id: number; label: string }[];
  label: string;
  emptyOption?: string;
  onChange: (value: number[]) => void;
}) => {
  const handleChange: FormEventHandler<HTMLSelectElement> = (e) => {
    onChange([...value, parseInt(e.currentTarget.value)]);
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={handleChange}>
        <option value="">{emptyOption ? emptyOption : "Select"}</option>
        {options
          .filter((o) => !value.includes(o.id))
          .map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
      </select>
      {value.map((v) => {
        const option = options.find((o) => o.id === v);
        if (!option) return null;

        return (
          <button
            key={option.id}
            onClick={() => onChange(value.filter((val) => val !== option.id))}
          >
            remove {option.label}
          </button>
        );
      })}
    </>
  );
};
export default Multiselect;
