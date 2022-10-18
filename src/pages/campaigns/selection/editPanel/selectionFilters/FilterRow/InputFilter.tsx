import {
  ErrorMessage,
  FormGroup,
  Input,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import styled from "styled-components";

const StyledInputFilter = styled.div`
  flex: 1 1 20px;
  margin-right: 8px;
  div {
    &:first-child {
      margin-bottom: 0;
    }
  }
`;

interface InputFilterProps {
  name: string;
  placeholder?: string;
}

export const InputFilter = ({ name, placeholder }: InputFilterProps) => {
  return (
    <StyledInputFilter>
      <Field
        name={name}
        validate={(value: string) => {
          if (!value) {
            return "This is a required field";
          }
        }}
      >
        {({ field }: FieldProps) => {
          return (
            <FormGroup>
              <div className="input-group">
                <Input
                  id={name}
                  type="text"
                  extra={{ ...field }}
                  placeholder={placeholder}
                />
              </div>
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </Field>
    </StyledInputFilter>
  );
};
