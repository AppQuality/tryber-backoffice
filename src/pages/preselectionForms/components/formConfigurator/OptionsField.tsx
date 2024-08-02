import {
  Button,
  Field,
  FormLabel,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
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
          <>
            <div>
              {fields[index].options?.map((option, i) => {
                const invalidOptions = fields[index].invalidOptions || [];
                const isInvalid = invalidOptions.includes(
                  arrayHelpers.form.values.fields[index].options[i]
                );
                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gridColumnGap: aqBootstrapTheme.grid.spacing.default,
                    }}
                    key={i}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "8px",
                      }}
                    >
                      <Field
                        name={`fields.${index}.options.${i}`}
                        type="text"
                      />
                      <Button
                        flat
                        disabled={false}
                        onClick={() => {
                          if (isInvalid) {
                            const invalidIndex = invalidOptions.indexOf(option);
                            invalidOptions.splice(invalidIndex, 1);
                          } else {
                            invalidOptions.push(option);
                          }
                          arrayHelpers.form.setFieldValue(
                            `fields.${index}.invalidOptions`,
                            invalidOptions
                          );
                        }}
                      >
                        {isInvalid ? "invalid" : "valid"}
                      </Button>
                    </div>
                    <div>
                      <Button
                        flat
                        // @ts-ignore
                        disabled={fields[index].options?.length <= 2}
                        style={{ borderColor: aqBootstrapTheme.colors.gray400 }}
                        onClick={() => arrayHelpers.remove(i)}
                      >
                        <XLg />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button onClick={() => arrayHelpers.push("")}>Add an Option</Button>
          </>
        )}
      />
    </>
  );
};
