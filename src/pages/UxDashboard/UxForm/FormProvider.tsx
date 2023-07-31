import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { string, array, object, number, lazy } from "yup";
import { reset } from "../uxDashboardSlice";
import siteWideMessageStore from "src/redux/siteWideMessages";

export interface FormValuesInterface {
  status?: GetCampaignsByCampaignUxApiResponse["status"];
  insights: NonNullable<GetCampaignsByCampaignUxApiResponse["insight"]>;
}

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { add } = siteWideMessageStore();
  const { id } = useParams<{ id: string }>();
  const { currentData, isLoading, isError, error, refetch } =
    useGetCampaignsByCampaignUxQuery({
      campaign: id,
    });
  const dispatch = useAppDispatch();
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
    status: currentData?.status,
    insights: currentData?.insight || [],
  };

  const validationSchema = object({
    status: string(),
    insights: array().of(
      object().shape({
        id: number(),
        title: string().required("Campo obbligatorio"),
        description: string().required("Campo obbligatorio"),
        severity: object()
          .shape({
            id: number().required("Campo obbligatorio"),
            name: string().required("Campo obbligatorio"),
          })
          .required("Campo obbligatorio"),
        cluster: lazy((value) =>
          typeof value === "string"
            ? string().required("Campo obbligatorio")
            : array()
                .of(
                  object().shape({
                    id: number().required("Campo obbligatorio"),
                    name: string().required("Campo obbligatorio"),
                  })
                )
                .required("Campo obbligatorio")
        ),
        videoPart: array().of(
          object().shape({
            id: number(),
            start: number().required("Campo obbligatorio"),
            end: number().required("Campo obbligatorio"),
            mediaId: number().required("Campo obbligatorio"),
            description: string().required("Campo obbligatorio"),
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
      enableReinitialize
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
        formikHelpers.setSubmitting(false);
        if ("error" in res) {
          add({
            type: "danger",
            message: `something went wrong`,
          });
        }
      }}
      onReset={() => {
        dispatch(reset());
        refetch();
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
