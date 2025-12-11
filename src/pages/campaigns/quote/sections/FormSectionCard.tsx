import { Card, Steps } from "@appquality/appquality-design-system";
import { useQuoteFormContext } from "../QuoteFormContext";

export const FormSectionCard = ({ campaignId }: { campaignId: string }) => {
  const { sections, goToSection, currentSection } = useQuoteFormContext();

  return (
    <Card className="aq-mb-4" title="Form Section">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Steps
          direction="vertical"
          current={sections.findIndex(
            (section) => section.id === currentSection
          )}
          clickHandler={(index, current) => {
            if (current === index) return;
            goToSection(sections[index].id);
          }}
        >
          {sections.map((section) => (
            <Steps.Step key={section.id} title={section.title} />
          ))}
        </Steps>
      </div>
    </Card>
  );
};
