import { FormGroup, TextareaField } from "@appquality/appquality-design-system";
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, name, ...props }: TextAreaProps) => {
  return (
    <FormGroup>
      <TextareaField name="name" label={label} />
    </FormGroup>
  );
};
export default TextArea;
