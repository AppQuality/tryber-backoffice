import { Title, Form } from "@appquality/appquality-design-system";
import InsightSection from "./Insights";

const UxDashboardForm = () => {
  return (
    <div data-qa="ux-dashboard-form">
      <Form>
        <section data-qa="form-section-insights" className="aq-mb-4">
          <Title size="ms" data-qa="section-title-insights" className="aq-mb-2">
            Dettaglio
          </Title>
          <InsightSection />
        </section>
      </Form>
    </div>
  );
};

export default UxDashboardForm;
