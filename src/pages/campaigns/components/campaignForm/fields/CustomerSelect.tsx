import {
  Dropdown,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import {
  GetDossiersByCampaignApiResponse,
  PostCustomersApiResponse,
  PostCustomersByCustomerProjectsApiResponse,
  useGetCustomersByCustomerProjectsQuery,
  useGetCustomersQuery,
  useGetUsersMePermissionsQuery,
  usePostCustomersByCustomerProjectsMutation,
  usePostCustomersMutation,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { SelectField } from "./SelectField";

const CustomerSelect = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const { data: permissions } = useGetUsersMePermissionsQuery();

  if (!permissions) return null;

  if (
    "appq_campaign" in permissions &&
    typeof permissions.appq_campaign !== "undefined" &&
    permissions.appq_campaign !== false
  ) {
    if (
      permissions.appq_campaign === true ||
      (dossier && permissions.appq_campaign.includes(dossier.id))
    ) {
      return <CustomerSelectWithPermission />;
    }
  }

  return <CustomerSelectWithoutPermission dossier={dossier} />;
};

const CustomerSelectWithoutPermission = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  return (
    <>
      <div>
        <FormLabel label="Customer" htmlFor="" />
        <Text>{dossier?.customer.name}</Text>
      </div>
      <div>
        <FormLabel label="Project" htmlFor="" />
        <Text>{dossier?.project.name}</Text>
      </div>
    </>
  );
};

const CustomerSelectWithPermission = () => {
  const { data: customers } = useGetCustomersQuery();
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();
  const [postCustomer] = usePostCustomersMutation();
  const options = useMemo(
    () =>
      customers?.map((customer) => ({
        value: customer.id?.toString() || "",
        label: customer.name || "No name",
      })) || [],
    [customers]
  );
  const createOption = useCallback(
    async (inputValue: string) => {
      // create project
      try {
        const response = await postCustomer({
          body: { name: inputValue },
        });
        if ("data" in response) {
          setFieldValue(
            "customerId",
            (response as { data: PostCustomersApiResponse }).data.id.toString()
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    [postCustomer, setFieldValue]
  );
  return (
    <>
      <SelectField
        name="customerId"
        options={options}
        label="Customer"
        onCreateOption={createOption}
      />
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
