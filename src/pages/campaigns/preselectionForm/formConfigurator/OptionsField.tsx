import { Button, Field, FormLabel } from "@appquality/appquality-design-system";
import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { XLg } from "react-bootstrap-icons";

export const OptionsField: React.FC<{ index: number }> = ({ index }) => {
  const {
    values: { fields },
  } = useFormikContext<PreselectionFormValues>();
  return (
    <>
      <FormLabel label="Options" htmlFor={`fields.${index}.options`} />
      <FieldArray
        name={`fields.${index}.options`}
        render={(arrayHelpers) => (
          <div>
            <div>
              {fields[index].options?.map((option, i) => (
                <div style={{ display: "flex" }} key={i}>
                  <Field name={`fields.${index}.options.${i}`} type="text" />
                  <Button
                    flat
                    size="sm"
                    style={{ padding: "0 10px", marginLeft: "1em" }}
                    onClick={() => arrayHelpers.remove(i)}
                  >
                    <XLg />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={() => arrayHelpers.push("")}>Add an Option</Button>
          </div>
        )}
      />
    </>
  );
};
