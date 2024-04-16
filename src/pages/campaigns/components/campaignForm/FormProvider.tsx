import { Formik } from "formik";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  GetDossiersByCampaignApiResponse,
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
  deviceList: number[];
  csm: number;
  tl?: number;
  pm?: number;
  researcher?: number;
}

const FormProvider = ({ children, dossier }: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [postDossiers] = usePostDossiersMutation();
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });

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
    closeDate: /* dossier?.closeDate ? formatDate(dossier.closeDate) : */ "",
    automaticDates: true,
    deviceList: dossier?.deviceList.map((device) => device.id) || [],
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
    deviceList: yup.array().min(1, "At least one device is required"),
    csm: yup.number().required("CSM is required"),
    tl: yup.number(),
    pm: yup.number(),
    researcher: yup.number(),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
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
              // closeDate: values.closeDate,
              deviceList: values.deviceList,
              csm: values.csm,
              // tl: values.tl,
              // pm: values.pm,
              // researcher: values.researcher,
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
