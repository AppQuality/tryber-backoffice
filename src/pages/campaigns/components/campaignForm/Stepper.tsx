import { Steps } from "@appquality/appquality-design-system";
import { useCampaignFormContext } from "./campaignFormContext";

const Stepper = () => {
  const { sections, goToSection, currentSection } = useCampaignFormContext();

  return (
    <Steps
      direction="vertical"
      current={sections.findIndex((section) => section.id === currentSection)}
      clickHandler={(index, current) => {
        if (current === index) return;
        goToSection(sections[index].id);
      }}
    >
      {sections.map((section) => (
        <Steps.Step key={section.id} title={section.title} />
      ))}
    </Steps>
  );
};

export { Stepper };
