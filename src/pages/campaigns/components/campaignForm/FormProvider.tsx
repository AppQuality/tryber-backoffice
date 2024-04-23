import { Formik } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  GetDossiersByCampaignApiResponse,
  PostDossiersApiArg,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetUsersMeQuery,
  usePostDossiersMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";
import { formatDate } from "./formatDate";
import { getAssistantIdByRole } from "./getAssistantIdByRole";

interface FormProviderInterface {
  children: React.ReactNode;
  dossier?: GetDossiersByCampaignApiResponse;
  isEdit?: boolean;
  duplicate?: PostDossiersApiArg["body"]["duplicate"];
}
export interface NewCampaignValues {
  isEdit: boolean;
  projectId: string;
  customerId: string;
  testType: string;
  customerTitle: string;
  testerTitle: string;
  startDate: string;
  endDate: string;
  closeDate: string;
  automaticDates: boolean;
  deviceList: string[];
  deviceTypes: string[];
  csm: string;
  tl?: string;
  pm?: string;
  researcher?: string;
  languages: string[];
  countries: string[];
  description?: string;
  productLink?: string;
  goal?: string;
  outOfScope?: string;
  deviceRequirements?: string;
  targetNotes?: string;
  targetSize?: number;
  browsersList?: string[];
  productType?: string;
}

const FormProvider = ({
  children,
  dossier,
  isEdit,
  duplicate,
}: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [postDossiers] = usePostDossiersMutation();
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  const { data: devices } = useGetDevicesByDeviceTypeOperatingSystemsQuery({
    deviceType: "all",
  });
  const selectedTypes = useMemo(() => {
    if (!dossier) return ["Smartphone", "PC"];

    const redundantTypeList = dossier.deviceList.map(
      (device) => devices?.find((d) => d.id === device.id)?.type || ""
    );
    return Array.from(new Set(redundantTypeList));
  }, [dossier, devices]);

  const selectedDevices = useMemo(() => {
    if (!dossier)
      return (
        devices
          ?.filter((device) => selectedTypes.includes(device.type))
          .map((device) => device.id.toString()) || []
      );

    return dossier.deviceList.map((device) => device.id.toString());
  }, [dossier, devices, selectedTypes]);

  if (isLoading || !data) return null;

  const initialValues: NewCampaignValues = {
    isEdit: isEdit || false,
    projectId: dossier?.project.id.toString() || "",
    customerId: dossier?.customer.id.toString() || "",
    csm: dossier?.csm.id.toString() || data.id.toString(),
    tl: getAssistantIdByRole({ roles: dossier?.roles, roleToFind: "tl" }) || "",
    pm: getAssistantIdByRole({ roles: dossier?.roles, roleToFind: "pm" }) || "",
    researcher:
      getAssistantIdByRole({
        roles: dossier?.roles,
        roleToFind: "researcher",
      }) || "",
    testType: dossier?.testType.id.toString() || "",
    customerTitle: dossier?.title.customer || "",
    testerTitle: dossier?.title.tester || "",
    startDate: dossier?.startDate ? formatDate(dossier.startDate) : "",
    endDate: dossier?.endDate ? formatDate(dossier.endDate) : "",
    closeDate: dossier?.closeDate ? formatDate(dossier.closeDate) : "",
    automaticDates: true,
    deviceTypes: selectedTypes,
    deviceList: selectedDevices,
    countries: dossier?.countries || [],
    languages: dossier?.languages?.map((lang) => lang.id.toString()) || [],
    description: dossier?.description || "",
    productLink: dossier?.productLink || "",
    goal: dossier?.goal || "",
    outOfScope: dossier?.outOfScope || "",
    deviceRequirements: dossier?.deviceRequirements || "",
    targetNotes: dossier?.target?.notes || "",
    targetSize: dossier?.target?.size || 0,
    browsersList:
      dossier?.browsers?.map((browser) => browser.id.toString()) || [],
    productType: dossier?.productType?.toString() || "",
  };

  const validationSchema = yup.object({
    customerId: yup.number().required("Project is required"),
    projectId: yup.number().required("Project is required"),
    testType: yup.number().required("Test type is required"),
    customerTitle: yup.string().required("Customer Title is required"),
    testerTitle: yup.string().required("Tester Title is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    closeDate: yup.string().required("Close date is required"),
    deviceTypes: yup.array().min(1, "At least one device type is required"),
    deviceList: yup.array().min(1, "At least one device is required"),
    csm: yup.number().required("CSM is required"),
    tl: yup.number(),
    pm: yup.number(),
    researcher: yup.number(),
    languages: yup.array().min(1, "At least one language is required"),
    countries: yup.array().min(1, "At least one country is required"),
    description: yup.string(),
    productLink: yup.string(),
    goal: yup.string(),
    outOfScope: yup.string(),
    deviceRequirements: yup.string(),
    targetNotes: yup.string(),
    targetSize: yup.number().min(1, "Target size must be greater than 0"),
    browsersList: yup.array().min(1, "At least one browser is required"),
    productType: yup.string(),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        let roles = [];
        if (values.pm) {
          roles.push({ role: 1, user: parseInt(values.pm) });
        }
        if (values.tl) {
          roles.push({ role: 2, user: parseInt(values.tl) });
        }
        if (values.researcher) {
          roles.push({ role: 3, user: parseInt(values.researcher) });
        }
        try {
          await postDossiers({
            body: {
              project: parseInt(values.projectId),
              testType: parseInt(values.testType),
              title: {
                customer: values.customerTitle,
                tester: values.testerTitle,
              },
              startDate: values.startDate,
              endDate: values.endDate,
              closeDate: values.closeDate,
              deviceList: values.deviceList.map((device) =>
                parseInt(device, 10)
              ),
              csm: parseInt(values.csm),
              roles: roles,
              languages: values.languages.map((language) =>
                parseInt(language, 10)
              ),
              countries: values.countries,
              description: values.description,
              productLink: values.productLink,
              goal: values.goal,
              outOfScope: values.outOfScope,
              deviceRequirements: values.deviceRequirements,
              target: {
                notes: values.targetNotes,
                size: values.targetSize,
              },
              browsers: values.browsersList?.map((browser) =>
                parseInt(browser, 10)
              ),
              productType: values.productType
                ? parseInt(values.productType, 10)
                : undefined,
              duplicate: duplicate,
            },
          }).unwrap();

          dispatch(
            addMessage(
              <p>
                <strong>Import successful</strong>
                <div>Campaign has been created successfully</div>
              </p>,
              "success"
            )
          );
        } catch (e) {
          dispatch(
            addMessage(
              "An error has occurred. Please try again.",
              "danger",
              false
            )
          );
        }
      }}
    >
      {children}
    </Formik>
  );
};
export default FormProvider;
