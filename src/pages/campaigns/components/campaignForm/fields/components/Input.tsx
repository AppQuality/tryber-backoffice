import {
  FormGroup,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const InputComponent = ({
  name,
  label,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <FormGroup>
      <FormLabel htmlFor={name} label={label} />
      <Input id={name} type={type} />
    </FormGroup>
  );
};
export default InputComponent;
