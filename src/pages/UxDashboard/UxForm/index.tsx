import { Title, Form, Text } from "@appquality/appquality-design-system";
import InsightSection from "./Insights";
import Test from "./campaign/Goal";
import Methodology from "./campaign/Methodology";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { setCurrentFormSection } from "../uxDashboardSlice";

const FormSection = ({
  title,
  subtitle,
  children,
  name,
  order,
}: {
  title: string;
  subtitle?: string;
  name: string;
  order: number;
  children: React.ReactNode;
}) => {
  const { currentFormSection } = useAppSelector((state) => state.uxDashboard);
  const dispatch = useAppDispatch();
  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const previousViewState = usePrevious(inView);

  useEffect(() => {
    if (
      inView &&
      previousViewState !== inView &&
      currentFormSection !== order
    ) {
      dispatch(setCurrentFormSection(order));
    }
    if (!inView && currentFormSection === order && entry) {
      entry.target.scrollIntoView({ behavior: "smooth" });
    }
  }, [inView, previousViewState, dispatch, currentFormSection, entry, order]);
  return (
    <section id={`form-section-${name}`} className="aq-mb-4" ref={ref}>
      <Title
        size="ms"
        data-qa={`section-title-${name}`}
        className="aq-mb-2 aq-pt-4"
      >
        {title}
      </Title>
      <Text className="aq-mb-4">{subtitle}</Text>
      {children}
    </section>
  );
};

const UxDashboardForm = () => {
  return (
    <div data-qa="ux-dashboard-form">
      <Form>
        <FormSection
          order={0}
          name="campaign"
          title="Sulla campagna"
          subtitle="Cosa volevamo scoprire con questo test e quale metodologia abbiamo usato per farlo"
        >
          <Test />
          <Methodology />
        </FormSection>
        <FormSection
          order={1}
          name="insights"
          title="Punti principali"
          subtitle="Cosa abbiamo scoperto dell’esperienza utente"
        >
          <InsightSection />
        </FormSection>
      </Form>
    </div>
  );
};

export default UxDashboardForm;
