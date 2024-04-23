import { useFormikContext } from "formik";
import {
  useGetCustomersByCustomerProjectsQuery,
  useGetCustomersQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { SelectField } from "./components/SelectField";
import { useMemo } from "react";

const CustomerSelect = () => {
  const { data: customers } = useGetCustomersQuery();
  const { values } = useFormikContext<NewCampaignValues>();

  const options = useMemo(
    () =>
      customers?.map((customer) => ({
        value: customer.id?.toString() || "",
        label: customer.name || "No name",
      })) || [],
    [customers]
  );
  return (
    <>
      <SelectField name="customerId" options={options} label="Customer" />
      {values.customerId && <ProjectSelect customerId={values.customerId} />}
    </>
  );
};

const ProjectSelect = ({ customerId }: { customerId: string }) => {
  const { data: projects } = useGetCustomersByCustomerProjectsQuery({
    customer: customerId.toString(),
  });
  const options = useMemo(
    () =>
      projects?.results.map((project) => ({
        id: project.id.toString(),
        label: project.name,
        value: project.id.toString(),
      })) || [],
    [projects]
  );

  return <SelectField name="projectId" options={options} label="Project" />;
};

export default CustomerSelect;
