import React, { createContext, useCallback, useContext, useState } from "react";

type Item = { id: string; ref?: IntersectionObserverEntry; title: string };
const Context = createContext<{
  sections: Item[];
  pushSection: (section: Item) => void;
  setCurrentSection: (section: string) => void;
  goToSection: (section: string) => void;
  currentSection: string;
}>({
  sections: [],
  setCurrentSection: () => {},
  pushSection: () => {},
  goToSection: () => {},
  currentSection: "",
});

const CampaignFormContext = ({ children }: { children: React.ReactNode }) => {
  const [currentSection, setCurrentSection] = useState<string>("");
  const [sections, setSections] = useState<Item[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const pushSection = useCallback((section: Item) => {
    setSections((prev) => {
      const items = [...prev, section];
      return items.filter(
        (item, index) => items.findIndex((i) => i.id === item.id) === index
      );
    });
  }, []);
  const handleSetCurrentSection = useCallback(
    (section: string) =>
      !isScrolling ? setCurrentSection(section) : undefined,
    [isScrolling]
  );

  const goToSection = useCallback(
    (section: string) => {
      if (isScrolling) return;
      const item = sections.find((item) => item.id === section);
      if (!item) return;
      const element = item.ref?.target;
      if (!element) return;
      const current = sections.find((item) => item.id === currentSection);

      const scrollTopDiff = Math.abs(
        // @ts-ignore
        element.offsetTop - (current?.ref?.target?.offsetTop || 0)
      );

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), scrollTopDiff * 0.4);
      element.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(section);
    },
    [sections, currentSection, isScrolling]
  );

  return (
    <Context.Provider
      value={{
        setCurrentSection: handleSetCurrentSection,
        sections,
        pushSection,
        goToSection,
        currentSection,
      }}
    >
      {children}
    </Context.Provider>
  );
};
const useCampaignFormContext = () => {
  const context = useContext(Context);

  if (!context) throw new Error("Provider not found for CampaignFormContext");

  return context;
};

export { CampaignFormContext, useCampaignFormContext };
