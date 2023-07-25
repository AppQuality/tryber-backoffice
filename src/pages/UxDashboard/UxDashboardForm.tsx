import {
  BSCol,
  BSGrid,
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
import { PreviewModal } from "./components/PreviewModal";
import SeverityPill from "./components/SeverityPill";

export interface FormValuesInterface {
  insights: NonNullable<GetCampaignsByCampaignUxApiResponse["insight"]>;
}
interface UxDashboardFormProps {
  campaignId: string;
}

const UxDashboardForm = ({ campaignId }: UxDashboardFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCampaignsByCampaignUxQuery({
    campaign: campaignId,
  });
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError) {
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
      <PreviewModal
        onClose={() => setPreviewOpen(false)}
        isOpen={previewOpen}
        title={"Preview Ux Dashboard"}
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
            <BSGrid>
              <BSCol size="col-lg-9">
                <Card className="aq-mb-3">
                  <section data-qa="form-section-insights">
                    <Title size="m" data-qa="section-title-insights">
                      Insights
                    </Title>
                    <InsightsWrapper
                      data-qa="insights-list"
                      className="aq-mb-3"
                    >
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
                  </section>
                </Card>
                <Title size="ms" data-qa="section-title-insights">
                  Overview campagna
                </Title>
                <Card title="Sentiment">
                  <section data-qa="form-section-ux-dashboard"></section>
                  nuova card
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <Card title="actions" className="aq-mb-3">
                  <Button
                    className="aq-mb-4"
                    type="primary"
                    size="block"
                    htmlType="submit"
                    data-qa="submit-draft"
                  >
                    Save Draft
                  </Button>
                  <p className="aq-mb-2">
                    <strong>Publish </strong>lorem ipsum dolor sit amet
                  </p>
                  <Button
                    htmlType="button"
                    size="block"
                    type="secondary"
                    data-qa="open-dashboard-preview"
                    onClick={() => setPreviewOpen(true)}
                  >
                    Preview
                  </Button>
                </Card>
              </BSCol>
            </BSGrid>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UxDashboardForm;
