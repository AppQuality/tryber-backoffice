import { Form, Formik, Text } from "@appquality/appquality-design-system";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  useGetUsersMeQuery,
  usePostDossiersMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";

interface FormProviderInterface {
  children: React.ReactNode;
}

export interface NewCampaignValues {
  projectId: number;
  customerId: number;
  testType: number;
  customerTitle: string;
  testerTitle: string;
  startDate: string;
  deviceList: number[];
  csm: number;
}

const FormProvider = ({ children }: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [postDossiers] = usePostDossiersMutation();
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  if (isLoading || !data) return null;

  const initialValues: NewCampaignValues = {
    projectId: 0,
    customerId: 0,
    csm: data.id,
    testType: 0,
    customerTitle: "",
    testerTitle: "",
    startDate: "",
    deviceList: [],
  };
  const validationSchema = yup.object({
    customerId: yup.number().required("Project is required"),
    projectId: yup.number().required("Project is required"),
    testType: yup.number().required("Test type is required"),
    customerTitle: yup.string().required("Customer Title is required"),
    testerTitle: yup.string().required("Tester Title is required"),
    startDate: yup.string().required("Start date is required"),
    deviceList: yup.array().min(1, "At least one device is required"),
    csm: yup.number().required("CSM is required"),
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
              deviceList: values.deviceList,
              csm: values.csm,
            },
          }).unwrap();

          dispatch(
            addMessage(
              <Text className="aq-text-primary">
                <strong>Import successful</strong>
                <div>Campaign has been created successfully</div>
              </Text>,
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
      <Form id="campaign-form">{children}</Form>
    </Formik>
  );
};
export default FormProvider;