import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useGetCampaignsByCampaignStatsQuery } from "src/services/tryberApi";

const useCampaignStats = (id: string) => {
  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
  });
  const { data: stats, isLoading: isLoadingStats } =
    useGetCampaignsByCampaignStatsQuery({
      campaign: id,
    });
  if (isLoading || isLoadingStats) {
    return {
      isLoading: true as const,
      isError: false as const,
      data: false as const,
    };
  }

  if (!data || !stats) {
    return {
      isLoading: false as const,
      isError: false as const,
      data: false as const,
    };
  }

  const allBugs = {
    total: 0,
    approved: 0,
    review: 0,
    refused: 0,
    pending: 0,
  };

  const uniqueBugs = {
    total: 0,
    approved: 0,
    review: 0,
    refused: 0,
    pending: 0,
  };

  const uniqueBugsByType: Record<string, number> = {};
  const uniqueBugsBySeverity: Record<string, number> = {};
  const favorites: string[] = [];

  const testers: number[] = [];

  data.items.forEach((bug) => {
    if (!testers.includes(bug.tester.id)) testers.push(bug.tester.id);

    allBugs.total++;
    if (bug.status.id === 1) allBugs.refused++;
    if (bug.status.id === 2) allBugs.approved++;
    if (bug.status.id === 3) allBugs.pending++;
    if (bug.status.id === 4) allBugs.review++;
    if (bug.duplication !== "duplicated") {
      if (bug.status.id === 2) {
        if (!uniqueBugsByType[bug.type.name])
          uniqueBugsByType[bug.type.name] = 0;
        if (!uniqueBugsBySeverity[bug.severity.name])
          uniqueBugsBySeverity[bug.severity.name] = 0;
        uniqueBugsByType[bug.type.name]++;
        uniqueBugsBySeverity[bug.severity.name]++;
        if (bug.isFavourite) favorites.push(bug.title);
      }

      uniqueBugs.total++;
      if (bug.status.id === 1) uniqueBugs.refused++;
      if (bug.status.id === 2) uniqueBugs.approved++;
      if (bug.status.id === 3) uniqueBugs.pending++;
      if (bug.status.id === 4) uniqueBugs.review++;
    }
  });

  const orderedUniqueBugsByType = Object.entries(uniqueBugsByType)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => {
      return {
        value: uniqueBugsByType[entry[0]],
        type: entry[0],
        percent: Math.round(
          (uniqueBugsByType[entry[0]] / uniqueBugs.approved) * 100
        ),
      };
    });

  return {
    isLoading: false,
    isError: false,
    data: {
      allBugs,
      uniqueBugs,
      bugsByType: orderedUniqueBugsByType,
      bugsBySeverity: uniqueBugsBySeverity,
      favorites,
      activeTesters: testers.length,
      totalTesters: stats.selected,
      activeTestersPercent:
        stats.selected > 0
          ? Math.round((testers.length / stats.selected) * 100)
          : 0,
    },
  };
};

export default useCampaignStats;
