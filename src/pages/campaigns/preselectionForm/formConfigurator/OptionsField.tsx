import { Button, Field, FormLabel } from "@appquality/appquality-design-system";
import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { XLg } from "react-bootstrap-icons";

export const OptionsField: React.FC<{ name: string }> = ({ name }) => {
  const {
    values: { questions },
  } = useFormikContext<PreselectionFormValues>();
  return (
    <>
      <FormLabel label="Options" htmlFor={`questions.${name}.options`} />
      <FieldArray
        name={`questions.${name}.options`}
        render={(arrayHelpers) => (
          <div>
            <div>
              {questions[name]?.options?.map((option, index) => (
                <div style={{ display: "flex" }} key={index}>
                  <Field
                    name={`questions.${name}.options.${index}`}
                    type="text"
                  />
                  <Button
                    flat
                    size="sm"
                    style={{ padding: "0 10px", marginLeft: "1em" }}
                    onClick={() => arrayHelpers.remove(index)}
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
