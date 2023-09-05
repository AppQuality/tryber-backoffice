import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignClustersQuery,
  useGetCampaignsByCampaignQuery,
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { v4 as uuidv4 } from "uuid";
import { array, lazy, number, object, string } from "yup";

export interface FormQuestion {
  internalId: string;
  name: GetCampaignsByCampaignUxApiResponse["questions"][number]["name"];
  id?: GetCampaignsByCampaignUxApiResponse["questions"][number]["id"];
}
export interface FormVideoPart {
  id?: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["id"];
  internalId: string;
  end: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["end"];
  description: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["description"];
  start: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["start"];
  mediaId: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["mediaId"];
  streamUrl: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["streamUrl"];
  url: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["videoParts"][number]["url"];
}
export interface FormInsight {
  id?: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["id"];
  internalId: string;
  title: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["title"];
  description: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["description"];
  severity: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["severity"];
  cluster: NonNullable<
    GetCampaignsByCampaignUxApiResponse["insights"]
  >[number]["clusters"];
  videoParts: FormVideoPart[];
}

export interface FormSentiment {
  clusterId: NonNullable<
    GetCampaignsByCampaignUxApiResponse["sentiments"]
  >[number]["cluster"]["id"];
  value: NonNullable<
    GetCampaignsByCampaignUxApiResponse["sentiments"]
  >[number]["value"];
  comment: string;
}
export interface FormValuesInterface {
  status?: GetCampaignsByCampaignUxApiResponse["status"];
  goal: GetCampaignsByCampaignUxApiResponse["goal"];
  methodology: GetCampaignsByCampaignUxApiResponse["methodology"];
  questions: FormQuestion[];
  usersNumber?: GetCampaignsByCampaignUxApiResponse["usersNumber"];
  insights: FormInsight[];
  sentiments?: FormSentiment[];
}

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { add } = siteWideMessageStore();
  const { id } = useParams<{ id: string }>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { currentData, isLoading, isError, error, refetch } =
    useGetCampaignsByCampaignUxQuery({
      campaign: id,
    });
  const { data: clusters } = useGetCampaignsByCampaignClustersQuery({
    campaign: id,
  });
  const { data: campaignData, isLoading: campaignDataLoading } =
    useGetCampaignsByCampaignQuery({ campaign: id });

  const initialValues: FormValuesInterface = useMemo(
    () => ({
      status: currentData?.status,
      goal: currentData?.goal || "",
      methodology: currentData?.methodology || {
        name: campaignData?.type || "",
        type: "qualitative",
        description: campaignData?.typeDescription || "",
      },
      questions:
        currentData?.questions?.map((question) => {
          return {
            internalId: uuidv4(),
            ...question,
          };
        }, []) || [],
      usersNumber: currentData?.usersNumber,
      insights:
        currentData?.insights?.map((insight) => {
          return {
            id: insight.id,
            internalId: uuidv4(),
            title: insight.title,
            description: insight.description,
            severity: {
              id: insight.severity.id,
              name: insight.severity.name,
            },
            cluster: insight.clusters,
            videoParts: insight.videoParts.map((video) => {
              return {
                id: video.id,
                internalId: uuidv4(),
                start: video.start,
                end: video.end - video.start,
                description: video.description,
                mediaId: video.mediaId,
                streamUrl: video.streamUrl,
                url: video.url,
              };
            }),
          };
        }) || [],
      sentiments:
        currentData?.sentiments && currentData.sentiments.length
          ? currentData.sentiments.map((sentiment) => {
              return {
                id: sentiment.id,
                clusterId: sentiment.cluster.id,
                value: sentiment.value,
                comment: sentiment.comment,
              };
            })
          : clusters?.items.map((cluster) => {
              return {
                clusterId: cluster.id,
                value: -1,
                comment: "",
              };
            }),
      // for validation to work we need to populate the array with empty values
    }),
    [currentData, campaignData, clusters]
  );

  if (isLoading || campaignDataLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError && "status" in error && error.status === 403) {
    // 404 is for data not found but the campaign exists
    // campaign does not exist
    return <Container>Error...</Container>;
  }

  const validationSchema = object({
    status: string(),
    goal: string().required("Campo obbligatorio"),
    methodology: object().shape({
      name: string(),
      type: string().required("Campo obbligatorio"),
      description: string().required("Campo obbligatorio"),
    }),
    usersNumber: number().required("Campo obbligatorio"),
    questions: array()
      .of(
        object().shape({
          name: string().required("Campo obbligatorio"),
        })
      )
      .min(1, "Campo obbligatorio"),
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
                    name: string().required("Campo obbligatorio"),
                  })
                )
                .required("Campo obbligatorio")
        ),
        videoParts: array().of(
          object().shape({
            end: number().required("Campo obbligatorio"),
            description: string().required("Campo obbligatorio"),
          })
        ),
      })
    ),
    sentiments: array().of(
      object().shape({
        value: number()
          .min(1, "Campo obbligatorio")
          .max(5, "Campo obbligatorio")
          .required("Campo obbligatorio"),
        comment: string()
          .max(100, "Massimo 100 caratteri")
          .required("Campo obbligatorio"),
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
        videoParts: !insight.videoParts
          ? []
          : insight.videoParts.map((video, videoIndex) => {
              return {
                id: video.id,
                order: videoIndex,
                start: video.start,
                end: Math.round(video.end) + video.start,
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
        // todo: better typing for values because validationSchema prevent usersNumber to be undefined
        if (values.usersNumber === undefined) return;

        formikHelpers.setSubmitting(true);
        const res = await saveDashboard({
          campaign: id,
          body: {
            goal: values.goal,
            questions: values.questions.map((question) => ({
              id: question.id,
              name: question.name,
            })),
            methodology: values.methodology,
            usersNumber: values.usersNumber,
            insights: mapFormInsightsForPatch(values.insights) || [],
            sentiments: values.sentiments || [],
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
        refetch();
      }}
      onReset={() => {
        refetch();
      }}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
