import { Card, Title, Form } from "@appquality/appquality-design-system";
import InsightSection from "./Insights";
import { GetCampaignsByCampaignUxApiResponse } from "src/services/tryberApi";

export interface FormValuesInterface {
  status: GetCampaignsByCampaignUxApiResponse["status"];
  insights: NonNullable<GetCampaignsByCampaignUxApiResponse["insight"]>;
}

const UxDashboardForm = () => {
  return (
    <div data-qa="ux-dashboard-form">
      <Form>
        <section data-qa="form-section-campaign" className="aq-mb-4">
          <Title size="ms" data-qa="section-title-campaign" className="aq-mb-2">
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
          <Title size="ms" data-qa="section-title-overview" className="aq-mb-2">
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
