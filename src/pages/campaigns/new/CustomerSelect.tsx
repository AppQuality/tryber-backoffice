import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import {
  useGetCustomersByCustomerProjectsQuery,
  useGetCustomersQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "./FormProvider";
import Select from "./components/Select";

const CustomerSelect = () => {
  const { data: customers } = useGetCustomersQuery();
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const options = customers
    ? customers.map((customer) => ({
        id: customer.id || 0,
        label: customer.name || "No name",
      }))
    : [];
  return (
    <>
      <div>
        <FormikField name="customerId">
          {({ field }: FieldProps) => (
            <Select
              name={field.name}
              options={options}
              value={field.value}
              label="Customer"
              onChange={(value) => {
                setFieldValue(field.name, value);
                setFieldValue("projectId", 0);
              }}
            />
          )}
        </FormikField>
      </div>
      {values.customerId !== 0 && (
        <ProjectSelect customerId={values.customerId} />
      )}
    </>
  );
};

const ProjectSelect = ({ customerId }: { customerId: number }) => {
  const { data: projects } = useGetCustomersByCustomerProjectsQuery({
    customer: customerId.toString(),
  });
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  const options = projects?.results
    ? projects.results.map((project) => ({
        id: project.id,
        label: project.name,
      }))
    : [];

  return (
    <div>
      <FormikField name="projectId">
        {({ field }: FieldProps) => (
          <Select
            name={field.name}
            options={options}
            value={field.value}
            label="Project"
            onChange={(value) => setFieldValue(field.name, value)}
          />
        )}
      </FormikField>
    </div>
  );
};

export default CustomerSelect;
