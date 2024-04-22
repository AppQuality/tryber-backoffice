import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import {
  useGetCustomersByCustomerProjectsQuery,
  useGetCustomersQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const CustomerSelect = () => {
  const { data: customers } = useGetCustomersQuery();
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const options = customers
    ? customers.map((customer) => ({
        id: customer.id?.toString() || "",
        label: customer.name || "No name",
      }))
    : [];
  return (
    <>
      <FormikField name="customerId">
        {({ field }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Customer" />
            <Dropdown
              id={field.name}
              name={field.name}
              options={options}
              value={field.value}
              onChange={(value) => {
                setFieldValue(field.name, value);
                setFieldValue("projectId", "");
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      {values.customerId && <ProjectSelect customerId={values.customerId} />}
    </>
  );
};

const ProjectSelect = ({ customerId }: { customerId: string }) => {
  const { data: projects } = useGetCustomersByCustomerProjectsQuery({
    customer: customerId.toString(),
  });
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  const options = projects?.results
    ? projects.results.map((project) => ({
        id: project.id.toString(),
        label: project.name,
        value: project.id.toString(),
      }))
    : [];

  return (
    <div>
      <FormikField name="projectId">
        {({ field }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Project" />
            <Dropdown
              id={field.name}
              name={field.name}
              options={options}
              value={field.value}
              onChange={(value) => setFieldValue(field.name, value)}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
    </div>
  );
};

export default CustomerSelect;
