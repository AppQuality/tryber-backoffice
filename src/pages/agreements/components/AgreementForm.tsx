import {
  Button,
  Checkbox,
  Datepicker,
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  FormGroup,
  FormLabel,
  Formik,
  FormikField,
  Input,
  TextareaField,
} from "@appquality/appquality-design-system";
import { FormikHelpers } from "formik";
import { GetAgreementsByAgreementIdApiResponse } from "src/services/tryberApi";
import * as yup from "yup";
import { roundNumberTwoDecimals } from "../utils";
import { CustomerSelect } from "./CustomerSelect";

type AgreementFormProps = {
  agreement?: GetAgreementsByAgreementIdApiResponse;
  onSubmit: (
    values: AgreementFormValues,
    actions: FormikHelpers<AgreementFormValues>
  ) => void;
};

export type AgreementFormValues = {
  title: string;
  tokens: number;
  tokenUnitPrice: number;
  amount: number;
  startDate: Date;
  expirationDate: Date;
  isTokenBased: boolean;
  note?: string;
  customer: string;
};

const AgreementForm = ({ agreement, onSubmit }: AgreementFormProps) => {
  const initialValues: AgreementFormValues = {
    title: agreement?.title || "",
    tokens: agreement?.tokens || 0,
    tokenUnitPrice: agreement?.unitPrice || 165,
    amount: agreement
      ? Math.round(agreement?.tokens * agreement?.unitPrice)
      : 0,
    startDate: agreement
      ? new Date(agreement.startDate.split(" ")[0])
      : new Date(),
    expirationDate: agreement
      ? new Date(agreement.expirationDate.split(" ")[0])
      : new Date(),
    isTokenBased: agreement?.isTokenBased || false,
    note: agreement?.note || "",
    customer: agreement?.customer?.id?.toString() || "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    tokens: yup.number().required("Required"),
    tokenUnitPrice: yup.number().moreThan(0).required("Required"),
    amount: yup.number().min(0),
    startDate: yup.date().required("Required"),
    expirationDate: yup.date().required("Required"),
    isTokenBased: yup.boolean().required("Required"),
    note: yup.string(),
    customer: yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values: { isTokenBased } }) => (
          <Form>
            <FormLabel htmlFor="title" label="Title" />
            <Field name="title" />
            <FormikField name="isTokenBased">
              {({ field, form }: FieldProps) => {
                return (
                  <>
                    <Checkbox
                      label="Is Token Based"
                      className="aq-mb-3"
                      id={field.name}
                      name={field.name}
                      defaultChecked={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        // if agreement change to not token based, calculate number of tokens based on amount
                        if (e.target.checked === false) {
                          form.setFieldValue("tokenUnitPrice", 1, true);
                          form.setFieldValue(
                            "tokens",
                            roundNumberTwoDecimals(
                              form.values.amount / form.values.tokenUnitPrice
                            ),
                            true
                          );
                        }
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </>
                );
              }}
            </FormikField>
            <FormLabel htmlFor="tokens" label="Tokens" />
            <Field type="number" name="tokens" disabled={!isTokenBased} />
            <FormikField name="tokenUnitPrice">
              {({ field, form }: FieldProps) => (
                <FormGroup>
                  <FormLabel htmlFor={field.name} label="Token Unit Price" />
                  <div className="input-group">
                    <Input
                      disabled={!isTokenBased}
                      value={field.value}
                      id={field.name}
                      type="number"
                      placeholder="Agreement Amount"
                      onChange={(value) => {
                        form.setFieldValue(
                          field.name,
                          parseFloat(value || "0"),
                          true
                        );
                        if (!isTokenBased && form.values.amount >= 0) {
                          form.setFieldValue(
                            "tokens",
                            roundNumberTwoDecimals(
                              form.values.amount / parseFloat(value || "0")
                            ),
                            true
                          );
                        }
                      }}
                    />
                  </div>
                  <ErrorMessage name="tokenUnitPrice" />
                </FormGroup>
              )}
            </FormikField>
            {!isTokenBased && (
              <FormikField name="amount">
                {({ field, form }: FieldProps) => (
                  <FormGroup>
                    <FormLabel htmlFor={field.name} label="Agreement Amount" />
                    <div className="input-group">
                      <Input
                        id={field.name}
                        value={field.value}
                        type="number"
                        placeholder="Agreement Amount"
                        onChange={(value) => {
                          form.setFieldValue(
                            field.name,
                            parseFloat(value),
                            true
                          );
                          if (!isTokenBased && form.values.tokenUnitPrice > 0) {
                            form.setFieldValue(
                              "tokens",
                              roundNumberTwoDecimals(
                                parseFloat(value || "0") /
                                  form.values.tokenUnitPrice
                              ),
                              true
                            );
                          }
                        }}
                      />
                    </div>
                  </FormGroup>
                )}
              </FormikField>
            )}
            <FormikField name="startDate">
              {({ field, form }: FieldProps) => {
                return (
                  <FormGroup key={field.value} data-qa={field.name}>
                    <FormLabel htmlFor={field.name} label="Start Date" />
                    <Datepicker
                      value={field.value}
                      id={field.name}
                      locale="it"
                      placeholder="Select a start date"
                      setText="Set"
                      cancelText="Cancel"
                      onCancel={() => {
                        form.setFieldValue("", field.name);
                      }}
                      onChange={(v: { value: Date }) => {
                        if (!v.value) {
                          v.value = new Date();
                        }
                        form.setFieldValue(field.name, v.value);
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormikField name="expirationDate">
              {({ field, form }: FieldProps) => {
                return (
                  <FormGroup key={field.value} data-qa={field.name}>
                    <FormLabel htmlFor={field.name} label="Expiration Date" />
                    <Datepicker
                      value={field.value}
                      id={field.name}
                      locale="it"
                      placeholder="Select a close date"
                      setText="Set"
                      cancelText="Cancel"
                      onCancel={() => {
                        form.setFieldValue("", field.name);
                      }}
                      onChange={(v: { value: Date }) => {
                        if (!v.value) {
                          v.value = new Date();
                        }
                        form.setFieldValue(field.name, v.value);
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormikField name="customer">
              {({ field, form }: FieldProps) => {
                return (
                  <FormGroup>
                    <CustomerSelect
                      isDisabled={!!agreement?.id}
                      isMulti={false}
                      name={field.name}
                      value={field.value}
                      onChange={(v: { value: string }) => {
                        form.setFieldValue(field.name, v.value, true);
                      }}
                      onBlur={() => {
                        form.setFieldTouched(field.name);
                      }}
                    />
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormLabel htmlFor="note" label="Notes" />
            <TextareaField
              name="note"
              placeholder="Notes"
              className="aq-mb-3"
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { AgreementForm };
