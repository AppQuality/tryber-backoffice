import { Form, Formik, Text } from "@appquality/appquality-design-system";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { usePostDossiersMutation } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";

interface FormProviderInterface {
  children: React.ReactNode;
}

export interface NewCampaignValues {
  projectId: number;
  customerId: number;
  testType: string;
  customerTitle: string;
  testerTitle: string;
  startDate: string;
  deviceList: number[];
}

const FormProvider = ({ children }: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [postDossiers] = usePostDossiersMutation();
  const initialValues: NewCampaignValues = {
    projectId: 0,
    customerId: 0,
    testType: "",
    customerTitle: "",
    testerTitle: "",
    startDate: "",
    deviceList: [],
  };
  const validationSchema = yup.object({
    customerId: yup.number().required("Project is required"),
    projectId: yup.number().required("Project is required"),
    testType: yup.string().required("Test type is required"),
    customerTitle: yup.string().required("Customer Title is required"),
    testerTitle: yup.string().required("Tester Title is required"),
    startDate: yup.string().required("Start date is required"),
    deviceList: yup.array().min(1, "At least one device is required"),
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
              testType: parseInt(values.testType),
              title: {
                customer: values.customerTitle,
                tester: values.testerTitle,
              },
              startDate: values.startDate,
              deviceList: values.deviceList,
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
