import {
  Button,
  Field,
  FormLabel,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
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
          <>
            <div>
              {fields[index].options?.map((option, i) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gridColumnGap: aqBootstrapTheme.grid.spacing.default,
                  }}
                  key={i}
                >
                  <Field name={`fields.${index}.options.${i}`} type="text" />
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
              ))}
            </div>
            <Button onClick={() => arrayHelpers.push("")}>Add an Option</Button>
          </>
        )}
      />
    </>
  );
};
