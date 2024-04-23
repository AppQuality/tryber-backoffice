import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const InputField = ({ name, label, type = "text", ...props }: InputProps) => {
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => {
        const handleChange = (val: string) => {
          form.setFieldValue(field.name, val);
        };
        const handleBlur = () => {
          form.setFieldTouched(field.name, true);
        };
        return (
          <FormGroup>
            <FormLabel htmlFor={field.name} label={label} />
            <Input
              id={field.name}
              type={type}
              value={field.value}
              onChange={handleChange}
              isInvalid={!!meta.error && meta.touched}
              extra={{ onBlur: handleBlur, ...props }}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        );
      }}
    </FormikField>
  );
};
export default InputField;
