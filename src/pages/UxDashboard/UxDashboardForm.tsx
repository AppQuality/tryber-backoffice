import {
  Button,
  Card,
  Container,
  Form,
  Formik,
  Pill,
  Title,
} from "@appquality/appquality-design-system";
import * as Yup from "yup";
import {
  AddNewInsightCTA,
  InsightPillsWrapper,
  InsightsWrapper,
} from "./components/styled";
import { FieldArray } from "formik";
import { InsightModal } from "./components/insightModal";
import { useState } from "react";
import { setInsightIndex, setSelectedInsight } from "./uxDashboardSlice";
import { useAppDispatch } from "src/store";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
} from "src/services/tryberApi";
import SeverityPill from "./components/SeverityPill";

export interface FormValuesInterface {
  status: GetCampaignsByCampaignUxApiResponse["status"];
  insights: NonNullable<GetCampaignsByCampaignUxApiResponse["insight"]>;
}
interface UxDashboardFormProps {
  campaignId: string;
}

const UxDashboardForm = ({ campaignId }: UxDashboardFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetCampaignsByCampaignUxQuery({
    campaign: campaignId,
  });
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError && "status" in error && error.status === 403) {
    // 404 is for data not found but the campaign exists
    // campaign does not exist
    return <Container>Error...</Container>;
  }
  const initialValues: FormValuesInterface = {
    status: data?.status || "draft",
    insights: data?.insight || [],
  };
  const validationSchema = Yup.object({
    status: Yup.string().required("Required"),
    insights: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        severityId: Yup.number().required("Required"),
        order: Yup.number().required("Required"),
        clusterId: Yup.number().required("Required"),
        videoParts: Yup.array().of(
          Yup.object().shape({
            id: Yup.number().required("Required"),
            start: Yup.number().required("Required"),
            end: Yup.number().required("Required"),
            mediaId: Yup.number().required("Required"),
            description: Yup.string().required("Required"),
            order: Yup.number().required("Required"),
          })
        ),
      })
    ),
  });

  function editInsight(insight: FormValuesInterface["insights"][number]): void {
    dispatch(setSelectedInsight(insight));
    setModalOpen(true);
  }

  return (
    <>
      <div data-qa="ux-dashboard-form">
        <Formik
          initialValues={initialValues}
          onSubmit={() => {
            alert("Form submitted");
          }}
          validationSchema={validationSchema}
        >
          <>
            <Form data-qa="ux-dashboard-form">
              <section data-qa="form-section-campaign" className="aq-mb-4">
                <InsightModal
                  onClose={() => setModalOpen(false)}
                  isOpen={modalOpen}
                />
                <Title
                  size="ms"
                  data-qa="section-title-campaign"
                  className="aq-mb-2"
                >
                  Sulla campagna
                </Title>
                <Card title="Domande" className="aq-mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card>
                <Card title="Metodologia" className="aq-mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card>
              </section>
              <section data-qa="form-section-overview" className="aq-mb-4">
                <Title
                  size="ms"
                  data-qa="section-title-overview"
                  className="aq-mb-2"
                >
                  Panoramica
                </Title>
                <Card title="Metriche" className="aq-mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card>
                <Card title="Sentiment" className="aq-mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card>
              </section>
              <section data-qa="form-section-insights" className="aq-mb-4">
                <Title
                  size="ms"
                  data-qa="section-title-insights"
                  className="aq-mb-2"
                >
                  Dettaglio
                </Title>
                <Card title="Insights" className="aq-mb-2">
                  <InsightsWrapper data-qa="insights-list" className="aq-mb-3">
                    <FieldArray
                      name="insights"
                      render={({ form, remove, push, name }) => (
                        <>
                          {form.values.insights.map(
                            (
                              insight: FormValuesInterface["insights"][number],
                              index: number
                            ) => (
                              <div
                                key={insight.id}
                                data-qa={`insight-card-${insight.id}`}
                              >
                                <Card title={insight.title}>
                                  <div className="aq-mb-3">
                                    {insight.description}
                                  </div>
                                  <div>
                                    <InsightPillsWrapper className="aq-mb-3">
                                      {insight?.severity && (
                                        <SeverityPill
                                          severity={insight.severity}
                                        />
                                      )}
                                      {Array.isArray(insight.cluster) &&
                                        insight.cluster.map((cluster) => (
                                          <Pill
                                            type="primary"
                                            className="aq-mr-1"
                                            key={cluster.id}
                                            flat
                                          >
                                            {cluster.name}
                                          </Pill>
                                        ))}
                                      {insight.cluster &&
                                        !Array.isArray(insight.cluster) && (
                                          <Pill
                                            type="primary"
                                            className="aq-mr-1"
                                            flat
                                          >
                                            General
                                          </Pill>
                                        )}
                                    </InsightPillsWrapper>
                                    <div
                                      style={{ display: "flex", gap: "5px" }}
                                    >
                                      <Button
                                        htmlType="button"
                                        flat
                                        type="danger"
                                        size="block"
                                        onClick={() => {
                                          window.confirm(
                                            "Are you sure you wish to delete this item?"
                                          ) && remove(index);
                                        }}
                                        data-qa="delete-insight"
                                      >
                                        Delete
                                      </Button>
                                      <Button
                                        htmlType="button"
                                        flat
                                        type="primary"
                                        size="block"
                                        onClick={() => {
                                          editInsight(insight);
                                          dispatch(setInsightIndex(index));
                                        }}
                                        data-qa="edit-insight"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )
                          )}
                          <Card shadow>
                            <AddNewInsightCTA
                              data-qa="add-new-insight"
                              onClick={() => {
                                push({
                                  title: "",
                                  description: "",
                                  videoParts: [],
                                });
                                dispatch(
                                  setInsightIndex(form.values.insights.length)
                                );
                                setModalOpen(true);
                              }}
                            >
                              <span className="icon-big">+</span>
                              <span>Add new insight</span>
                            </AddNewInsightCTA>
                          </Card>
                        </>
                      )}
                    />
                  </InsightsWrapper>
                </Card>
              </section>
            </Form>
          </>
        </Formik>
      </div>
    </>
  );
};

export default UxDashboardForm;
