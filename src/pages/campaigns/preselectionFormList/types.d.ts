type SearchByType = "id" | "name" | "campaign_id";

interface SearchByItem {
  id: SearchByType;
  label: string;
}
