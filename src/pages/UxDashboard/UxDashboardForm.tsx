import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Container,
  Form,
  Formik,
  Title,
} from "@appquality/appquality-design-system";
import * as Yup from "yup";
import { InsightsWrapper } from "./components/styled";
import { InsightModal } from "./components/insightModal";
import { useState } from "react";
import { setSelectedInsight } from "./uxDashboardSlice";
import { useAppDispatch } from "src/store";
import {
  GetCampaignsByCampaignUxApiResponse,
  useGetCampaignsByCampaignUxQuery,
} from "src/services/tryberApi";
import { PreviewModal } from "./components/PreviewModal";

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
                <Card>
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
                              Severity: {insight.severity.name}
                            </div>
                            <div
                              className="aq-mb-3"
                              style={{ display: "flex", gap: "5px" }}
                            >
                              <Button
                                htmlType="button"
                                type="primary"
                                size="block"
                                onClick={() => editInsight(insight)}
                                data-qa="edit-insight"
                              >
                                Edit
                              </Button>
                              <Button
                                htmlType="button"
                                type="primary"
                                size="block"
                                onClick={() => alert("delete insight")}
                                data-qa="delete-insight"
                              >
                                Delete
                              </Button>
                            </div>
                          </Card>
                        </div>
                      ))}
                      <Card title="Add new Insight">
                        <Button
                          htmlType="button"
                          data-qa="add-new-insight"
                          size="block"
                          onClick={() => setModalOpen(true)}
                        >
                          +
                        </Button>
                      </Card>
                    </InsightsWrapper>
                  </section>
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <Card title="actions">
                  <p className="aq-mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <Button
                    className="aq-mb-3"
                    type="primary"
                    size="block"
                    htmlType="submit"
                    data-qa="submit-draft"
                  >
                    Save Draft
                  </Button>
                  <Button
                    htmlType="button"
                    size="block"
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
