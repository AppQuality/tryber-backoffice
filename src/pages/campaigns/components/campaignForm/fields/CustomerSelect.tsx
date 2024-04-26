import { useFormikContext } from "formik";
import {
  PostCustomersByCustomerProjectsApiResponse,
  useGetCustomersByCustomerProjectsQuery,
  useGetCustomersQuery,
  usePostCustomersByCustomerProjectsMutation,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { SelectField } from "./SelectField";
import { useCallback, useMemo } from "react";
import { FormLabel, Dropdown } from "@appquality/appquality-design-system";

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
      {values.customerId ? (
        <ProjectSelect customerId={values.customerId} />
      ) : (
        <div>
          <FormLabel label="Project" htmlFor="" />
          <Dropdown isDisabled placeholder="Select a customer" />
        </div>
      )}
    </>
  );
};

const ProjectSelect = ({ customerId }: { customerId: string }) => {
  const { data: projects } = useGetCustomersByCustomerProjectsQuery({
    customer: customerId.toString(),
  });
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const [postProject] = usePostCustomersByCustomerProjectsMutation();
  const createOption = useCallback(
    async (inputValue: string) => {
      // create project
      try {
        const response = await postProject({
          customer: customerId,
          body: { name: inputValue },
        });
        if ("data" in response) {
          setFieldValue(
            "projectId",
            (
              response as { data: PostCustomersByCustomerProjectsApiResponse }
            ).data.id.toString()
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    [customerId, postProject, setFieldValue]
  );
  const options = useMemo(
    () =>
      projects?.results.map((project) => ({
        id: project.id.toString(),
        label: project.name,
        value: project.id.toString(),
      })) || [],
    [projects]
  );

  return (
    <SelectField
      name="projectId"
      label="Project"
      options={options}
      onCreateOption={createOption}
    />
  );
};

export default CustomerSelect;
