import { Card } from "@appquality/appquality-design-system";
import { useCampaignFormContext } from "./campaignFormContext";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) => {
  const { setCurrentSection, pushSection } = useCampaignFormContext();

  const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });
  useEffect(() => {
    if (entry) pushSection({ id, ref: entry, title });
  }, [entry, id, title, pushSection]);

  useEffect(() => {
    if (inView) setCurrentSection(id);
  }, [inView, id, setCurrentSection]);
  return (
    <section ref={ref} id={id}>
      <Card className="aq-mb-4" title={title}>
        {children}
      </Card>
    </section>
  );
};

export { Section };
