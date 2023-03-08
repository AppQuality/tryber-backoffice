import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";

const useTags = (id: string) => {
  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
  });

  if (!data)
    return {
      tags: [],
      isError: true,
      isLoading,
      total: 0,
    };

  const tags = data.items.reduce((carry, i) => {
    if (!i.tags) return carry;
    return [...carry, ...i.tags];
  }, [] as NonNullable<(typeof data)["items"][number]["tags"]>[number][]);
  const options = tags
    .filter((o, i) => tags.findIndex((oo) => oo.id === o.id) === i)
    .sort((a, b) => b.id - a.id)
    .map((o) => {
      const tagCount = tags.filter((t) => t.id === o.id).length;
      return { id: o.id.toString(), name: `${o.name} (${tagCount})` };
    });

  if (options.length < 2)
    return {
      tags: [],
      isError: false,
      isLoading,
      total: 0,
    };

  const total = options.length;
  options.unshift({ id: "none", name: "No tags" });

  return {
    tags: options,
    isError: false,
    isLoading,
    total,
  };
};

export default useTags;
