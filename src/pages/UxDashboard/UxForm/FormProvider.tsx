import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { string, array, object, number, lazy } from "yup";
import { reset } from "../uxDashboardSlice";
import siteWideMessageStore from "src/redux/siteWideMessages";

export interface FormVideoPart {
  id?: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["id"];
  internalId: string;
  end: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["end"];
  description: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["description"];
  start: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["start"];
  mediaId: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["mediaId"];
  streamUrl: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["streamUrl"];
  url: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["videoPart"][number]["url"];
}
export interface FormInsight {
  id?: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["id"];
  internalId: string;
  title: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["title"];
  description: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["description"];
  severity: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["severity"];
  cluster: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insight"]
  >[number]["cluster"];
  videoPart?: FormVideoPart[];
}
export interface FormValuesInterface {
  status?: GetCampaignsByCampaignUxApiResponse["status"];
  insights?: FormInsight[];
}

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { add } = siteWideMessageStore();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { currentData, isLoading, isError, error, refetch } =
    useGetCampaignsByCampaignUxQuery({
      campaign: id,
    });

  const initialValues: FormValuesInterface = useMemo(
    () => ({
      status: currentData?.status,
      campaignDescription: "",
      questions: [],
      insights: currentData?.insight?.map((insight) => {
        return {
          id: insight.id,
          internalId: uuidv4(),
          title: insight.title,
          description: insight.description,
          severity: {
            id: insight.severity.id,
            name: insight.severity.name,
          },
          cluster: insight.cluster,
          videoPart: insight.videoPart.map((video) => {
            return {
              id: video.id,
              internalId: uuidv4(),
              start: video.start,
              end: video.end,
              description: video.description,
              mediaId: video.mediaId,
              streamUrl: video.streamUrl,
              url: video.url,
            };
          }),
        };
      }),
    }),
    [currentData]
  );

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError && "status" in error && error.status === 403) {
    // 404 is for data not found but the campaign exists
    // campaign does not exist
    return <Container>Error...</Container>;
  }

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
    insights?.map((insight, index) => {
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
                end: Math.round(video.end),
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
            insights: mapFormInsightsForPatch(values.insights) || [],
            sentiments: [],
          },
        });
        formikHelpers.setSubmitting(false);
        if ("error" in res) {
          add({
            type: "danger",
            message: `something went wrong`,
            expire: 8,
          });
        } else {
          add({
            type: "success",
            message: `Dashboard saved`,
            expire: 8,
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
