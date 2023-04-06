import { Select } from "@appquality/appquality-design-system";
import {
  ProspectStatus,
  useGetCampaignsByCampaignProspectQuery,
  usePatchCampaignsByCampaignProspectMutation,
} from "src/services/tryberApi";

const StatusSelector = ({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) => {
  const { data, isLoading } = useGetCampaignsByCampaignProspectQuery({
    campaign: id,
  });
  const [patchProspect] = usePatchCampaignsByCampaignProspectMutation();

  if (isLoading || !data || disabled) return null;

  const { status } = data;

  const setStatus = (status: ProspectStatus) =>
    patchProspect({
      campaign: id,
      body: {
        status,
      },
    });

  const options: { value: ProspectStatus; label: string }[] = [
    { value: "confirmed", label: "🟢 Confirmed" },
    { value: "draft", label: "🟠 Draft" },
  ];

  return (
    <div className="aq-mx-2" style={{ width: "140px" }}>
      <Select
        name="status"
        label=""
        isClearable={false}
        value={{ value: status, label: "" }}
        options={options}
        onChange={(e) => setStatus(e.value as ProspectStatus)}
      />
    </div>
  );
};

export default StatusSelector;
