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
import { AddNewInsightCTA, InsightsWrapper } from "./components/styled";
import { InsightModal } from "./components/insightModal";
import { useState } from "react";
import { setSelectedInsight } from "./uxDashboardSlice";
import { useAppDispatch } from "src/store";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
} from "src/services/tryberApi";
import SeverityPill from "./components/SeverityPill";

export interface FormValuesInterface {
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
    // campaign does not exist
    return <Container>Error...</Container>;
  }
  const initialValues: FormValuesInterface = {
    insights: data?.insight || [],
  };
  const validationSchema = Yup.object({
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
      <InsightModal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        title={"new/edit Insight"}
      />
      <div data-qa="ux-dashboard-form">
        <Formik
          initialValues={initialValues}
          onSubmit={() => {
            alert("Form submitted");
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <section data-qa="form-section-campaign" className="aq-mb-4">
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
              <Card className="aq-mb-2">
                <Title size="m" data-qa="section-title-insights">
                  Insights
                </Title>
                <InsightsWrapper data-qa="insights-list" className="aq-mb-3">
                  {initialValues.insights.map((insight) => (
                    <div
                      key={insight.id}
                      data-qa={`insight-card-${insight.id}`}
                    >
                      <Card title={insight.title}>
                        <div className="aq-mb-3">{insight.description}</div>
                        <div className="aq-mb-3">
                          <SeverityPill severity={insight.severity} />
                        </div>
                        <div className="aq-mb-3">
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
                              <Pill type="primary" className="aq-mr-1" flat>
                                General
                              </Pill>
                            )}
                        </div>
                        <div
                          className="aq-mb-3"
                          style={{ display: "flex", gap: "5px" }}
                        >
                          <Button
                            htmlType="button"
                            flat
                            type="danger"
                            size="block"
                            onClick={() => alert("delete insight")}
                            data-qa="delete-insight"
                          >
                            Delete
                          </Button>
                          <Button
                            htmlType="button"
                            flat
                            type="primary"
                            size="block"
                            onClick={() => editInsight(insight)}
                            data-qa="edit-insight"
                          >
                            Edit
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
                  <Card shadow>
                    <AddNewInsightCTA
                      data-qa="add-new-insight"
                      onClick={() => setModalOpen(true)}
                    >
                      <span className="icon-big">+</span>
                      <span>Add new insight</span>
                    </AddNewInsightCTA>
                  </Card>
                </InsightsWrapper>
              </Card>
            </section>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UxDashboardForm;
