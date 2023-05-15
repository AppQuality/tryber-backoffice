import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignGroupsQuery } from "src/services/tryberApi";

const GroupSelect = ({
  campaignId,
  current,
  onChange,
}: {
  campaignId: string;
  current: number[];
  onChange: (value: number[]) => void;
}) => {
  const { data, isLoading } = useGetCampaignsByCampaignGroupsQuery({
    campaign: campaignId,
  });

  if (isLoading || !data || data?.length < 2) return null;
  const groups = data.map((d) => ({ value: d.id.toString(), label: d.name }));
  return (
    <div className="aq-mt-2 aq-mb-3">
      <Select
        label=""
        isMulti
        name="group"
        options={groups}
        value={groups.filter((g) => current.includes(Number(g.value)))}
        onChange={(value) => {
          onChange(
            value.map((v: { value: string; label: string }) => Number(v.value))
          );
        }}
      />
    </div>
  );
};

export default GroupSelect;
