import copyToClipboard from "./copyToClipboard";
import useCampaignStats from "./useCampaignStats";

const useCopyResume = (id: string) => {
  const { data, isLoading } = useCampaignStats(id);
  if (isLoading) {
    return () => alert("Loading");
  }

  if (!data) {
    return () => alert("There was an error");
  }
  return () => {
    copyToClipboard(`Ciao,
ti confermo che il test si è concluso il {inserire giorno}, di seguito trovi un riepilogo con qualche dato sulla campagna di test:
- ${
      data.allBugs.approved
    } bug sono stati accettati e sono visibili lato vostro in piattaforma, di cui ${
      data.uniqueBugs.approved
    } sono risultati univoci
${
  data.bugsByType.length
    ? `- il ${data.bugsByType[0].percent}% dei bug unici riguarda problemi di tipo ${data.bugsByType[0].type}`
    : ""
}      
${
  data.bugsByType.length > 0
    ? `- il ${data.bugsByType[1].percent}% dei bug unici riguarda problemi di tipo ${data.bugsByType[1].type}`
    : ""
}      
${
  data.bugsByType.length > 1
    ? `- il ${data.bugsByType[2].percent}% dei bug unici riguarda problemi di tipo ${data.bugsByType[2].type}`
    : ""
}      
- il ${
      "CRITICAL" in data.bugsBySeverity
        ? Math.round(
            (data.bugsBySeverity["CRITICAL"] / data.uniqueBugs.approved) * 100
          )
        : 0
    }% dei bug unici è stato segnalato con severità critica
- il ${
      "HIGH" in data.bugsBySeverity
        ? Math.round(
            (data.bugsBySeverity["HIGH"] / data.uniqueBugs.approved) * 100
          )
        : 0
    }% dei bug unici è stato segnalato con severità alta
- il ${
      "MEDIUM" in data.bugsBySeverity
        ? Math.round(
            (data.bugsBySeverity["MEDIUM"] / data.uniqueBugs.approved) * 100
          )
        : 0
    }% dei bug unici è stato segnalato con severità media
- il ${
      "LOW" in data.bugsBySeverity
        ? Math.round(
            (data.bugsBySeverity["LOW"] / data.uniqueBugs.approved) * 100
          )
        : 0
    }% dei bug unici è stato segnalato con severità bassa
Puoi trovare di seguito alcuni dei bug più rilevanti:
${data.favorites.join("\n")}`);
  };
};

export default useCopyResume;
