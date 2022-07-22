import {
  FormGroup,
  FormLabel,
  Input,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";

export const CufTextField = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  return (
    <Field
      name={name}
      validate={(value: string) => {
        if (!value) {
          return "This is a required field";
        }
      }}
    >
      {({ field, meta }: FieldProps) => {
        return (
          <FormGroup className="aq-mb-3">
            {label && <FormLabel htmlFor={name} label={label} />}
            <div className="input-group">
              <Input
                id={name}
                type="text"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ ...field }}
              />
            </div>
            <ErrorMessage name={name} />
          </FormGroup>
        );
      }}
    </Field>
  );
};
