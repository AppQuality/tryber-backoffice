import {
  Formik,
  Form,
  Field,
  FormikField,
  FormLabel,
  Select,
  TextareaField,
  Button,
  Checkbox,
  FormGroup,
  FieldProps,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import * as yup from "yup";

const AgreementForm = () => {
  // todo: get Agreement data, if any

  type AgreementFormValues = {
    title: string;
    tokens: string;
    tokenUnitPrice: string;
    startDate: string;
    closeDate: string;
    isTokenBased?: boolean;
    notes: string;
    customer: string;
  };
  const initialValues: AgreementFormValues = {
    title: "",
    tokens: "",
    tokenUnitPrice: "",
    startDate: "",
    closeDate: "",
    isTokenBased: false,
    notes: "",
    customer: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    tokens: yup.string().required("Required"),
    tokenUnitPrice: yup.string().required("Required"),
    startDate: yup.string().required("Required"),
    closeDate: yup.string().required("Required"),
    isTokenBased: yup.boolean().required("Required"),
    notes: yup.string(),
    customer: yup.string().required("Required"),
  });

  const onSubmit = (values: AgreementFormValues) => {
    console.log(values);
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
          <Field name="tokens" />
          <FormLabel htmlFor="tokenUnitPrice" label="Token Unit Price" />
          <Field name="tokenUnitPrice" />
          <FormLabel htmlFor="startDate" label="Start Date" />
          <Field name="startDate" />
          <FormLabel htmlFor="closeDate" label="Close Date" />
          <Field name="closeDate" />
          <FormLabel htmlFor="isTokenBased" label="Is Token Based" />
          <Checkbox id="isTokenBased" name="isTokenBased" />
          <FormikField name="customer">
            {({ field, form }: FieldProps) => {
              return (
                <FormGroup>
                  <Select
                    data-qa="customer-select"
                    isMulti
                    name={field.name}
                    onBlur={() => {
                      form.setFieldTouched(field.name);
                    }}
                    onChange={(value) => {
                      form.setFieldValue(field.name, value, true);
                    }}
                    label="Customer"
                    value={field.value}
                    options={[]}
                  />
                  <ErrorMessage name={field.name} />
                </FormGroup>
              );
            }}
          </FormikField>
          <FormLabel htmlFor="notes" label="Notes" />
          <TextareaField name="notes" placeholder="Notes" />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export { AgreementForm };
