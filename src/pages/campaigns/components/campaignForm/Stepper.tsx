import { Steps } from "@appquality/appquality-design-system";
import { useCampaignFormContext } from "./campaignFormContext";

const Stepper = () => {
  const { currentSections, sections } = useCampaignFormContext();

  return (
    <>
      <Steps
        direction="vertical"
        current={sections.findIndex(
          (section) =>
            section.id === currentSections[currentSections.length - 1]
        )}
        clickHandler={(index, current) => {
          if (current === index) return;
          const element = sections[index].ref?.target;
          if (!element) return;
          element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {sections.map((section) => (
          <Steps.Step key={section.id} title={section.id} />
        ))}
      </Steps>
    </>
  );
};

export { Stepper };
