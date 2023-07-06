import {
  Formik,
  Form,
  Field,
  FormikField,
  FormLabel,
  TextareaField,
  Button,
  Checkbox,
  FormGroup,
  FieldProps,
  ErrorMessage,
  Datepicker,
  DatepickerGlobalStyle,
} from "@appquality/appquality-design-system";
import { FormikHelpers } from "formik";
import * as yup from "yup";
import { CustomerSelect } from "./CustomerSelect";
import { GetAgreementsByAgreementIdApiResponse } from "src/services/tryberApi";

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
  startDate: string;
  expirationDate: string;
  isTokenBased: boolean;
  note?: string;
  customer: string;
};

const AgreementForm = ({ agreement, onSubmit }: AgreementFormProps) => {
  const initialValues: AgreementFormValues = {
    title: agreement?.title || "",
    tokens: agreement?.tokens || 0,
    tokenUnitPrice: agreement?.unitPrice || 0,
    startDate: agreement?.startDate.split(" ")[0] || "",
    expirationDate: agreement?.expirationDate.split(" ")[0] || "",
    isTokenBased: agreement?.isTokenBased || false,
    note: agreement?.note || "",
    customer: agreement?.customer?.id?.toString() || "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    tokens: yup.number().required("Required"),
    tokenUnitPrice: yup.number().required("Required"),
    startDate: yup.string().required("Required"),
    expirationDate: yup.string().required("Required"),
    isTokenBased: yup.boolean().required("Required"),
    note: yup.string(),
    customer: yup.string().required("Required"),
  });

  return (
    <div>
      <DatepickerGlobalStyle />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormLabel htmlFor="title" label="Title" />
          <Field name="title" />
          <FormikField name="isTokenBased">
            {({ field }: FieldProps) => {
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
                    }}
                  />
                  <ErrorMessage name={field.name} />
                </>
              );
            }}
          </FormikField>
          <FormLabel htmlFor="tokens" label="Tokens" />
          <Field type="number" name="tokens" />
          <FormLabel htmlFor="unitPrice" label="Token Unit Price" />
          <Field type="number" name="tokenUnitPrice" />
          <FormikField name="startDate">
            {({ field, form }: FieldProps) => {
              return (
                <FormGroup>
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
                      form.setFieldValue(
                        field.name,
                        `${v.value.getFullYear()}-${
                          v.value.getMonth() + 1
                        }-${v.value.getDate()}`
                      );
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
                <FormGroup>
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
                      form.setFieldValue(
                        field.name,
                        `${v.value.getFullYear()}-${
                          v.value.getMonth() + 1
                        }-${v.value.getDate()}`
                      );
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
          <TextareaField name="note" placeholder="Notes" className="aq-mb-3" />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export { AgreementForm };
