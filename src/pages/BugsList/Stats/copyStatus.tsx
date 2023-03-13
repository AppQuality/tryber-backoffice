import copyToClipboard from "./copyToClipboard";
import useCampaignStats from "./useCampaignStats";

const useCopyStatus = (id: string) => {
  const { data, isLoading } = useCampaignStats(id);
  if (isLoading) {
    return () => alert("Loading");
  }

  if (!data) {
    return () => alert("There was an error");
  }
  return () => {
    copyToClipboard(`Ciao,
al momento sono presenti ${
      data.allBugs.approved
    } bug approvati nella campagna, di cui ${
      data.uniqueBugs.approved
    } sono unici. I bug unici segnalati fino a questo momento sono distribuiti come segue:
${data.bugsByType
  .map((bug) => `- ${bug.type}: ${bug.value} (${bug.percent}%)`)
  .join("\n")}
La severità dei bug finora segnalati è la seguente:
- LOW: ${
      "LOW" in data.bugsBySeverity
        ? `${data.bugsBySeverity["LOW"]} (${Math.round(
            (data.bugsBySeverity["LOW"] / data.uniqueBugs.approved) * 100
          )}%)`
        : `0 (0%)`
    }
- MEDIUM: ${
      "MEDIUM" in data.bugsBySeverity
        ? `${data.bugsBySeverity["MEDIUM"]} (${Math.round(
            (data.bugsBySeverity["MEDIUM"] / data.uniqueBugs.approved) * 100
          )}%)`
        : `0 (0%)`
    }
- HIGH: ${
      "HIGH" in data.bugsBySeverity
        ? `${data.bugsBySeverity["HIGH"]} (${Math.round(
            (data.bugsBySeverity["HIGH"] / data.uniqueBugs.approved) * 100
          )}%)`
        : `0 (0%)`
    }
- CRITICAL: ${
      "CRITICAL" in data.bugsBySeverity
        ? `${data.bugsBySeverity["CRITICAL"]} (${Math.round(
            (data.bugsBySeverity["CRITICAL"] / data.uniqueBugs.approved) * 100
          )}%)`
        : `0 (0%)`
    }
Fino a questo momento un totale di ${data.activeTesters} / ${
      data.totalTesters
    } (${
      data.activeTestersPercent
    }%) tester si sono attivati e hanno caricato almeno un bug.`);
  };
};

export default useCopyStatus;
