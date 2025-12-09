import { Formik } from "@appquality/appquality-design-system";
import {
  useGetDossiersByCampaignHumanResourcesQuery,
  usePutDossiersByCampaignHumanResourcesMutation,
} from "src/services/tryberApi";
import * as yup from "yup";

import siteWideMessageStore from "src/redux/siteWideMessages";

export type FormProps = {
  items: Array<{
    assignee: number;
    days: number;
    role: number;
  }>;
};

const FormProvider = ({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) => {
  const { add } = siteWideMessageStore();
  const [save] = usePutDossiersByCampaignHumanResourcesMutation();
  const { data, isLoading } = useGetDossiersByCampaignHumanResourcesQuery({
    campaign: campaignId,
  });
  const validationSchema = yup.object({
    items: yup.array().of(
      yup.object({
        assignee: yup.number().required().min(1),
        days: yup.number().min(1).required().min(1),
        role: yup.number().required().min(1),
      })
    ),
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <Formik<FormProps>
      enableReinitialize
      initialValues={{
        items: (data.items || []).map((item) => ({
          assignee: item?.assignee?.id || 0,
          days: item?.days || 0,
          role: item?.rate?.id || 0,
        })),
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await save({
          campaign: campaignId,
          body: values.items.map((item) => ({
            assignee: item.assignee,
            days: item.days,
            rate: item.role,
          })),
        })
          .unwrap()
          .then(() => {
            add({
              type: "success",
              message: "Human Resources saved successfully",
            });
          })
          .catch((e) => {
            add({
              type: "danger",
              message: "An error occurred while saving the Human Resources",
            });
            console.error(e);
          });
      }}
    >
      <div>{children}</div>
    </Formik>
  );
};

export default FormProvider;
