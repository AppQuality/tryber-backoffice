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
import siteWideMessageStore from "src/redux/siteWideMessages";
import { CustomerSelect } from "./CustomerSelect";
import {
  GetAgreementsByAgreementIdApiResponse,
  usePostAgreementsMutation,
  usePutAgreementsByAgreementIdMutation,
} from "src/services/tryberApi";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useHistory } from "react-router-dom";

type AgreementFormProps = {
  agreement?: GetAgreementsByAgreementIdApiResponse;
  refetch?: () => void;
};

const AgreementForm = ({ agreement, refetch }: AgreementFormProps) => {
  const [newAgreement] = usePostAgreementsMutation();
  const [editAgreement] = usePutAgreementsByAgreementIdMutation();
  const history = useHistory();
  const { add } = siteWideMessageStore();

  type AgreementFormValues = {
    title: string;
    tokens: number;
    tokenUnitPrice: number;
    startDate: string;
    expirationDate: string;
    isTokenBased: boolean;
    note?: string;
    customer: Option;
  };
  const initialValues: AgreementFormValues = {
    title: agreement?.title || "",
    tokens: agreement?.tokens || 0,
    tokenUnitPrice: agreement?.unitPrice || 0,
    startDate: agreement?.startDate.split(" ")[0] || "",
    expirationDate: agreement?.expirationDate.split(" ")[0] || "",
    isTokenBased: agreement?.isTokenBased || false,
    note: agreement?.note || "",
    customer: {
      label: agreement?.customer?.company || "",
      value: agreement?.customer?.id?.toString() || "",
    },
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    tokens: yup.number().required("Required"),
    tokenUnitPrice: yup.number().required("Required"),
    startDate: yup.string().required("Required"),
    expirationDate: yup.string().required("Required"),
    isTokenBased: yup.boolean().required("Required"),
    note: yup.string(),
    customer: yup
      .object({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      })
      .required("Required"),
  });

  const onSubmit = async (
    values: AgreementFormValues,
    actions: FormikHelpers<AgreementFormValues>
  ) => {
    actions.setSubmitting(true);
    if (!values.customer.value) {
      actions.setFieldError("customer", "Required");
      actions.setSubmitting(false);
      return;
    }
    const res = agreement?.id
      ? await editAgreement({
          agreementId: agreement.id.toString(),
          body: {
            title: values.title,
            tokens: values.tokens,
            unitPrice: values.tokenUnitPrice,
            startDate: values.startDate,
            expirationDate: values.expirationDate,
            isTokenBased: values.isTokenBased,
            note: values.note,
            customerId: parseInt(values.customer.value),
          },
        })
      : await newAgreement({
          body: {
            title: values.title,
            tokens: values.tokens,
            unitPrice: values.tokenUnitPrice,
            startDate: values.startDate,
            expirationDate: values.expirationDate,
            isTokenBased: values.isTokenBased,
            note: values.note,
            customerId: parseInt(values.customer.value),
          },
        });
    if (res && "data" in res) {
      if ("agreementId" in res.data) {
        history.push(`/backoffice/agreements/${res.data.agreementId}`);
        add({ type: "success", message: "New Agreement Saved" });
      }
      if ("id" in res.data) {
        if (refetch) refetch();
        history.push(`/backoffice/agreements/${res.data.id}`);
        add({ type: "success", message: "Agreement Updated" });
      }
    } else {
      add({
        type: "danger",
        message: "There was an error",
      });
    }
  };

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
          <FormLabel htmlFor="isTokenBased" label="Is Token Based" />
          <FormikField name="isTokenBased">
            {({ field }: FieldProps) => {
              return (
                <Checkbox
                  id={field.name}
                  name={field.name}
                  defaultChecked={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
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
                    onChange={(value) => {
                      form.setFieldValue(field.name, value, true);
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
          <TextareaField name="note" placeholder="Notes" />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export { AgreementForm };
