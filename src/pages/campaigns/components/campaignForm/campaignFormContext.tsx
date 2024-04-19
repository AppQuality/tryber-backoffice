import React, { createContext, useContext, useState } from "react";

type Item = { id: string; ref?: IntersectionObserverEntry };
const Context = createContext<{
  currentSections: string[];
  sections: Item[];
  pushSection: (section: Item) => void;
  addSectionToCurrent: (section: string) => void;
  removeSectionFromCurrent: (section: string) => void;
  goToSection: (section: string) => void;
}>({
  currentSections: [],
  sections: [],
  addSectionToCurrent: () => {},
  removeSectionFromCurrent: () => {},
  pushSection: () => {},
  goToSection: () => {},
});

const CampaignFormContext = ({ children }: { children: React.ReactNode }) => {
  const [currentSections, setCurrentSections] = useState<string[]>([]);
  const [sections, setSections] = useState<Item[]>([]);
  return (
    <Context.Provider
      value={{
        currentSections,
        addSectionToCurrent: (section: string) => {
          setCurrentSections((prev) => {
            const current = [...prev, section];
            return current.sort(
              (a, b) =>
                sections.findIndex((section) => section.id === a) -
                sections.findIndex((section) => section.id === b)
            );
          });
        },
        removeSectionFromCurrent: (section: string) => {
          setCurrentSections((prev) => {
            const current = prev.filter((s) => s !== section);
            return current.sort(
              (a, b) =>
                sections.findIndex((section) => section.id === a) -
                sections.findIndex((section) => section.id === b)
            );
          });
        },
        sections,
        pushSection: (section: Item) => {
          setSections((prev) => {
            const items = [...prev, section];
            return items.filter(
              (item, index) =>
                items.findIndex((i) => i.id === item.id) === index
            );
          });
        },
        goToSection: (section: string) => {},
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
