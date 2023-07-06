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
} from "@appquality/appquality-design-system";
import { FormikHelpers } from "formik";
import * as yup from "yup";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { CustomerSelect } from "./CustomerSelect";
import { usePostAgreementsMutation } from "src/services/tryberApi";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useHistory } from "react-router-dom";

const AgreementForm = () => {
  const [newAgreement] = usePostAgreementsMutation();
  const history = useHistory();
  const { add } = siteWideMessageStore();
  // todo: get Agreement data, if any

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
    title: "",
    tokens: 0,
    tokenUnitPrice: 0,
    startDate: "",
    expirationDate: "",
    isTokenBased: false,
    note: "",
    customer: {
      label: "Select a customer",
      value: "",
    },
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    tokens: yup.number().required("Required"),
    tokenUnitPrice: yup.number().required("Required"),
    startDate: yup.string().required("Required"),
    closeDate: yup.string().required("Required"),
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
    const res = await newAgreement({
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
      history.push(`/backoffice/agreements/${res.data.agreementId}`);
      add({ type: "success", message: "Agreement saved" });
    } else {
      add({
        type: "danger",
        message: "There was an error",
      });
    }
  };

  return (
    <div>
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
          <FormLabel htmlFor="startDate" label="Start Date" />
          <Field name="startDate" />
          <FormLabel htmlFor="expirationDate" label="Close Date" />
          <Field name="closeDate" />
          <FormLabel htmlFor="isTokenBased" label="Is Token Based" />
          <Checkbox id="isTokenBased" name="isTokenBased" />
          <FormikField name="customer">
            {({ field, form }: FieldProps) => {
              return (
                <FormGroup>
                  <CustomerSelect
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
