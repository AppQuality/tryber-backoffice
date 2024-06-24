import {
  FormGroup,
  FormikField,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";
import React from "react";
import { FieldProps } from "formik";

export const ShortTitleField: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className }) => {
  return (
    <FormikField name={name}>
      {({ field }: FieldProps) => {
        return (
          <FormGroup className={`aq-mb-3 ${className || ""}`}>
            <FormLabel htmlFor={field.name} label={"Short Title"} />
            <div className="input-group">
              <Input id={field.name} type="text" extra={{ ...field }} />
            </div>
          </FormGroup>
        );
      }}
    </FormikField>
  );
};
