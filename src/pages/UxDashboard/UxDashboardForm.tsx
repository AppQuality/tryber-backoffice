import {
  Button,
  Card,
  Form,
  Formik,
  Title,
} from "@appquality/appquality-design-system";
import data from "./data/ux/_get/response_200_insights.json";
import * as Yup from "yup";
import { InsightsWrapper } from "./components/styled";

interface VideoPart {
  id: number;
  start: number;
  end: number;
  mediaId: number;
  description: string;
}
interface InsightSeverity {
  id: number;
  name: string;
}
interface InsightCluster {
  id: number;
  name: string;
}
interface Insight {
  id: number;
  title: string;
  description: string;
  severity: InsightSeverity;
  cluster: string | InsightCluster[];
  videoPart: VideoPart[];
}
interface FormValuesInterface {
  insights: Insight[];
}

const UxDashboardForm = () => {
  const initialValues: FormValuesInterface = {
    insights: data.insight || [],
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

  return (
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
                <Card
                  key={insight.id}
                  data-qa={`insight-card-${insight.id}`}
                  title={insight.title}
                >
                  <div className="aq-mb-3">{insight.description}</div>
                  Severity: {insight.severity.name}
                </Card>
              ))}
              <Card title="Add new Insight">
                <Button
                  htmlType="button"
                  data-qa="add-new-insight"
                  size="block"
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
  );
};

export default UxDashboardForm;
