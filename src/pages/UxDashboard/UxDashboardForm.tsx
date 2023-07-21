import {
  Button,
  Card,
  Form,
  Formik,
  Title,
} from "@appquality/appquality-design-system";
import * as Yup from "yup";
import { InsightsWrapper } from "./components/styled";
import { InsightModal } from "./components/insightModal";
import { useState } from "react";
import { Insight } from "./components/InsightForm";
import { setSelectedInsight } from "./uxDashboardSlice";
import { useAppDispatch } from "src/store";
import { useGetCampaignsByCampaignUxQuery } from "src/services/tryberApi";

interface FormValuesInterface {
  insights: Insight[];
}
interface UxDashboardFormProps {
  campaignId: string;
}

const UxDashboardForm = ({ campaignId }: UxDashboardFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCampaignsByCampaignUxQuery({
    campaign: campaignId,
  });
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

  function editInsight(insight: Insight): void {
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
            <section data-qa="form-section-insights">
              <Title size="m" data-qa="section-title-insights">
                Insights
              </Title>
              <InsightsWrapper data-qa="insights-list" className="aq-mb-3">
                {initialValues.insights.map((insight) => (
                  <div data-qa={`insight-card-${insight.id}`}>
                    <Card key={insight.id} title={insight.title}>
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
                          type="info"
                          size="block"
                          onClick={() => editInsight(insight)}
                          data-qa="edit-insight"
                        >
                          Edit
                        </Button>
                        <Button
                          htmlType="button"
                          type="danger"
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
            <Button htmlType="submit" data-qa="submit-draft">
              Save Draft
            </Button>
            <Button htmlType="reset" data-qa="reset-fields">
              Reset
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UxDashboardForm;
