type SearchByType = "id" | "name" | "campaignId";

interface SearchByItem {
  id: SearchByType;
  label: string;
}
