import { Title, Form, Text } from "@appquality/appquality-design-system";
import Test from "./campaign/Goal";
import Methodology from "./campaign/Methodology";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  setCurrentFormSection,
  setIsProgrammaticallyScrolling,
} from "../uxDashboardSlice";
import SentimentSection from "./Sentiment";

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
  const { currentFormSection, isProgrammaticallyScrolling } = useAppSelector(
    (state) => state.uxDashboard
  );
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
    // entering in view and not already in view
    // aknowledge the change and set current form section
    if (
      inView &&
      !previousViewState &&
      currentFormSection !== order &&
      !isProgrammaticallyScrolling
    ) {
      dispatch(setCurrentFormSection(order));
      return;
    }
    // animating click on navigation
    if (
      !inView &&
      currentFormSection === order &&
      isProgrammaticallyScrolling &&
      entry
    ) {
      entry.target.scrollIntoView({ behavior: "smooth" });
      // approximated time to scroll
      // set end of animation
      setTimeout(() => dispatch(setIsProgrammaticallyScrolling(false)), 800);
      return;
    }
  }, [
    inView,
    previousViewState,
    dispatch,
    currentFormSection,
    entry,
    order,
    isProgrammaticallyScrolling,
  ]);
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
          name="results"
          title="Panoramica"
          subtitle="Com'è stata l'esperienza complessiva degli utenti con il prodotto"
        >
          <SentimentSection />
        </FormSection>
      </Form>
    </div>
  );
};

export default UxDashboardForm;
