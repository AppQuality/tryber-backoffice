import { Title, Text } from "@appquality/appquality-design-system";
import { useCampaignFormContext } from "./campaignFormContext";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({
  title,
  subtitle,
  id,
  children,
  style,
}: {
  title: string;
  subtitle: string;
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
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
    <section ref={ref} id={id} className="aq-mb-4 aq-pt-4" style={style}>
      <Title size="ms" className="aq-mb-2">
        {title}
      </Title>
      <Text className="aq-mb-4">{subtitle}</Text>
      {children}
    </section>
  );
};

export { Section };
