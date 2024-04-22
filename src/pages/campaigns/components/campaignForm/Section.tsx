import { Card } from "@appquality/appquality-design-system";
import { useCampaignFormContext } from "./campaignFormContext";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({
  title,
  className,
  id,
  children,
}: {
  title: string;
  className?: string;
  id: string;
  children: React.ReactNode;
}) => {
  const { setCurrentSection, pushSection } = useCampaignFormContext();

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (entry) pushSection({ id, ref: entry, title });
  }, [entry, id, title]);

  useEffect(() => {
    if (inView) setCurrentSection(id);
  }, [inView, id]);
  return (
    <div ref={ref} id={id}>
      <Card title={title} className={`${className || ""} aq-mb-4`}>
        {children}
      </Card>
    </div>
  );
};

export { Section };
