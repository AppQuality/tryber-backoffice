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

  const mapFormInsightsForPatch = (insights: FormValuesInterface["insights"]) =>
    insights.map((insight, index) => {
      return {
        id: insight.id,
        title: insight.title,
        description: insight.description,
        order: index,
        severityId: insight.severity.id,
        clusterIds: Array.isArray(insight.cluster)
          ? insight.cluster.map((cluster) => cluster.id)
          : insight.cluster,
        videoPart: !insight.videoPart
          ? []
          : insight.videoPart.map((video, videoIndex) => {
              return {
                id: video.id,
                order: videoIndex,
                start: video.start,
                end: video.end,
                mediaId: video.mediaId,
                description: video.description,
              };
            }),
      };
    });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        const res = await saveDashboard({
          campaign: id,
          body: {
            insights: mapFormInsightsForPatch(values.insights),
            sentiments: [],
          },
        });
        console.log(res);
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
