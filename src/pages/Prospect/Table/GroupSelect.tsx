import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignGroupsQuery } from "src/services/tryberApi";

const GroupSelect = ({
  style,
  campaignId,
  current,
  onChange,
}: {
  style?: React.CSSProperties;
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
    <div style={style}>
      <Select
        label=""
        isMulti
        placeholder="Filter by groups"
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
