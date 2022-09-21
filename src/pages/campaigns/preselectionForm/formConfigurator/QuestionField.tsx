import {
  ErrorMessage,
  FormGroup,
  FormikField,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";
import React from "react";
import { FieldProps } from "formik";

export const QuestionField: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  return (
    <FormikField
      name={name}
      validate={(value: string) => {
        if (!value) {
          return "This is a required field";
        }
      }}
    >
      {({ field, meta }: FieldProps) => {
        return (
          <FormGroup className={`aq-mb-3 ${className || ""}`}>
            <FormLabel htmlFor={field.name} label={"Question"} />
            <div className="input-group">
              <Input
                id={field.name}
                type="text"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ ...field }}
              />
            </div>
            <ErrorMessage name={field.name} />
          </FormGroup>
        );
      }}
    </FormikField>
  );
};
