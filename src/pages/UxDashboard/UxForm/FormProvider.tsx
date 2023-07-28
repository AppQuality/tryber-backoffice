import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { string, array, object, number, lazy } from "yup";

export interface FormValuesInterface {
  status?: GetCampaignsByCampaignUxApiResponse["status"];
  insights: NonNullable<GetCampaignsByCampaignUxApiResponse["insight"]>;
}

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetCampaignsByCampaignUxQuery({
    campaign: id,
  });
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError && "status" in error && error.status === 403) {
    // 404 is for data not found but the campaign exists
    // campaign does not exist
    return <Container>Error...</Container>;
  }
  const initialValues: FormValuesInterface = {
    status: data?.status,
    insights: data?.insight || [],
  };
  const validationSchema = object({
    status: string(),
    insights: array().of(
      object().shape({
        id: number(),
        title: string().required(),
        description: string().required(),
        severity: object()
          .shape({
            id: number().required(),
            name: string().required(),
          })
          .required(),
        cluster: lazy((value) =>
          typeof value === "string"
            ? string().required()
            : array()
                .of(
                  object().shape({
                    id: number().required(),
                    name: string().required(),
                  })
                )
                .required()
        ),
        videoParts: array().of(
          object().shape({
            id: number().required(),
            start: number().required(),
            end: number().required(),
            mediaId: number().required(),
            description: string().required(),
          })
        ),
      })
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        console.log(values);
        // values.insights = values.insights.map((insight) => {
        //   insight.cluster = insight.cluster.map((cluster) => cluster.id);
        //   insight.videoParts = insight.videoParts.map((videoPart) => ({
        //     ...videoPart,
        //     mediaId: videoPart.mediaId.toString(),
        //   }));
        //   return insight;
        // }
        // await saveDashboard({
        //   campaign: id,
        //   body: {
        //     insights: values.insights,
        //   },
        // })
        alert("Form submitted");
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
