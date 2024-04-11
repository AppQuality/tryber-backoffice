import { Form, Formik, Text } from "@appquality/appquality-design-system";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { usePostDossiersMutation } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";

interface FormProviderInterface {
  children: React.ReactNode;
}

export interface NewCampaignValues {
  project: number;
  testType: string;
  customer: string;
  tester: string;
  startDate: string;
  deviceList: number[];
}

const FormProvider = ({ children }: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [postDossiers] = usePostDossiersMutation();
  const initialValues: NewCampaignValues = {
    project: 0,
    testType: "",
    customer: "",
    tester: "",
    startDate: "",
    deviceList: [],
  };
  const validationSchema = yup.object({
    project: yup.string().required("Project is required"),
    testType: yup.string().required("Test type is required"),
    customer: yup.string().required("Customer is required"),
    tester: yup.string().required("Tester is required"),
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
              project: values.project,
              testType: parseInt(values.testType),
              title: {
                customer: values.customer,
                tester: values.tester,
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
