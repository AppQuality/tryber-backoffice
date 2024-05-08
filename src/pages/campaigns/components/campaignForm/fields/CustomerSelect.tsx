import {
  Dropdown,
  ErrorMessage,
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
    permissions.appq_campaign === true
  ) {
    return <CustomerSelectWithPermission />;
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
      <div>
        <SelectField
          name="customerId"
          options={options}
          label="Customer"
          required
          onCreateOption={createOption}
          placeholder="Start typing to select or add"
        />
      </div>
      {values.customerId ? (
        <ProjectSelect customerId={values.customerId} />
      ) : (
        <div>
          <FormLabel
            label={
              <>
                <span>Project</span> <span className="aq-text-danger">*</span>
              </>
            }
            htmlFor=""
          />
          <Dropdown
            className="aq-mb-2"
            isDisabled
            placeholder="Start typing to select or add"
          />
          <ErrorMessage name="projectId" />
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
    <>
      <SelectField
        name="projectId"
        label="Project *"
        options={options}
        onCreateOption={createOption}
        placeholder="start typing to create or select"
        notes="You can select or create a project by writing the name in the field"
      />
    </>
  );
};

export default CustomerSelect;
