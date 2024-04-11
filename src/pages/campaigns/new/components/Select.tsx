import { useFormikContext } from "formik";
import { FormEventHandler } from "react";
import { NewCampaignValues } from "../FormProvider";

const Select = ({
  name,
  value,
  options,
  label,
  emptyOption,
}: {
  name: string;
  value: number;
  options: { id: number; label: string }[];
  label: string;
  emptyOption?: string;
}) => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const handleChange: FormEventHandler<HTMLSelectElement> = (e) => {
    setFieldValue(name, e.currentTarget.value);
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={handleChange}>
        <option value="">{emptyOption ? emptyOption : "Select"}</option>
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
