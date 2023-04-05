import { Button, Pill } from "@appquality/appquality-design-system";
import { PutCampaignsByCampaignProspectApiArg } from "src/services/tryberApi";
import usePayTesters from "./usePayTesters";
import useProspectItems from "./useProspectItems";

const PayTesterButton = ({
  id,
  testers,
  disabled,
}: {
  id: string;
  testers: PutCampaignsByCampaignProspectApiArg["body"]["items"];
  disabled?: boolean;
}) => {
  const { isPaying, payTesters } = usePayTesters(id);
  const { isDone } = useProspectItems({
    id,
  });

  if (isDone)
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Pill flat type="success">
          Done
        </Pill>
      </div>
    );

  return (
    <Button
      size="sm"
      type="primary"
      onClick={() => {
        if (
          window.confirm(
            `You are about to pay ${testers.length} testers. Are you sure?`
          )
        ) {
          payTesters(testers);
        }
      }}
      disabled={isPaying || disabled}
    >
      {isPaying ? "Paying..." : "Pay Testers"}
    </Button>
  );
};

export default PayTesterButton;
