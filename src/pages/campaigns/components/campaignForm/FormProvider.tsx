import { Formik } from "formik";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  GetDossiersByCampaignApiResponse,
  useGetDevicesByDeviceTypeOperatingSystemsQuery,
  useGetUsersMeQuery,
  usePostDossiersMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";
import { formatDate } from "./formatDate";
import { getAssistantIdByRole } from "./getAssistantIdByRole";
import { useMemo } from "react";

interface FormProviderInterface {
  children: React.ReactNode;
  dossier?: GetDossiersByCampaignApiResponse;
}

export interface NewCampaignValues {
  isEdit: boolean;
  projectId: number;
  customerId: number;
  testType: number;
  customerTitle: string;
  testerTitle: string;
  startDate: string;
  endDate: string;
  closeDate: string;
  automaticDates: boolean;
  deviceList: string[];
  deviceTypes: string[];
  csm: number;
  tl?: number;
  pm?: number;
  researcher?: number;
  languages: string[];
}

const FormProvider = ({ children, dossier }: FormProviderInterface) => {
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
    isEdit: !!dossier,
    projectId: dossier?.project.id || 0,
    customerId: dossier?.customer.id || 0,
    csm: dossier?.csm.id || data.id,
    tl: getAssistantIdByRole({ roles: dossier?.roles, roleToFind: "tl" }) || 0,
    pm: getAssistantIdByRole({ roles: dossier?.roles, roleToFind: "pm" }) || 0,
    researcher:
      getAssistantIdByRole({
        roles: dossier?.roles,
        roleToFind: "researcher",
      }) || 0,
    testType: dossier?.testType.id || 0,
    customerTitle: dossier?.title.customer || "",
    testerTitle: dossier?.title.tester || "",
    startDate: dossier?.startDate ? formatDate(dossier.startDate) : "",
    endDate: dossier?.endDate ? formatDate(dossier.endDate) : "",
    closeDate: dossier?.closeDate ? formatDate(dossier.closeDate) : "",
    automaticDates: true,
    deviceTypes: selectedTypes,
    deviceList: selectedDevices,
    languages: dossier?.languages?.map((lang) => lang.id.toString()) || [],
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
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        let roles = [];
        if (values.pm) {
          roles.push({ role: 1, user: values.pm });
        }
        if (values.tl) {
          roles.push({ role: 2, user: values.tl });
        }
        if (values.researcher) {
          roles.push({ role: 3, user: values.researcher });
        }
        try {
          await postDossiers({
            body: {
              project: values.projectId,
              testType: values.testType,
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
              csm: values.csm,
              roles: roles,
              //languages: values.languages.map((language) => parseInt(language, 10)),
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
