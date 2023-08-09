import { Title, Form, Text } from "@appquality/appquality-design-system";
import InsightSection from "./Insights";

const UxDashboardForm = () => {
  return (
    <div data-qa="ux-dashboard-form">
      <Form>
        <section data-qa="form-section-insights" className="aq-mb-4">
          <Title size="ms" data-qa="section-title-insights" className="aq-mb-2">
            Punti principali
          </Title>
          <Text className="aq-mb-4">
            Cosa abbiamo scoperto dell’esperienza utente
          </Text>
          <InsightSection />
        </section>
      </Form>
    </div>
  );
};

export default UxDashboardForm;
