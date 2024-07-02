import { Container, Formik } from "@appquality/appquality-design-system";
import { ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  GetCampaignsByCampaignUxApiResponse,
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
  sentiments?: FormSentiment[];
}

export const sentimentNoteMaxChar = 100;
export const videoCitMaxChar = 150;
export const insightDescriptionMaxChar = 350;
const FormProvider = ({ children }: { children: ReactNode }) => {
  const { add } = siteWideMessageStore();
  const { id } = useParams<{ id: string }>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { currentData, isLoading, isError, error, refetch } =
    useGetCampaignsByCampaignUxQuery({
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
          : [],
    }),
    [currentData, campaignData]
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
        description: string()
          .max(
            insightDescriptionMaxChar,
            `Massimo ${insightDescriptionMaxChar} caratteri`
          )
          .required("Campo obbligatorio"),
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
            description: string()
              .max(videoCitMaxChar, `Massimo ${videoCitMaxChar} caratteri`)
              .required("Campo obbligatorio"),
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
          .max(
            sentimentNoteMaxChar,
            `Massimo ${sentimentNoteMaxChar} caratteri`
          )
          .required("Campo obbligatorio"),
      })
    ),
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
