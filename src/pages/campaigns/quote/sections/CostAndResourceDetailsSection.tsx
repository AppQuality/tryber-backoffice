import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  Input,
} from "@appquality/appquality-design-system";
import { useGetDossiersByCampaignCostsQuery } from "src/services/tryberApi";
import { HorizontalDivider } from "../components/Dividers";
import HumanResources from "./HumanResources";
import { Section } from "./Section";

type CostAndResourceDetailsSectionProps = {
  campaignId?: string;
};

export const CostAndResourceDetailsSection = ({
  campaignId,
}: CostAndResourceDetailsSectionProps) => {
  const { data: assistantTotal } = useGetDossiersByCampaignCostsQuery({
    campaign: campaignId ?? "",
    filterBy: { type: "4" },
  });

  const { data: testerTotal } = useGetDossiersByCampaignCostsQuery({
    campaign: campaignId ?? "",
    filterBy: { type: "1,2,3" },
  });
  return (
    <Section
      title="Cost & Resource details"
      subtitle="Overview of costs and allocated resources"
      id="resources"
    >
      <Card className="aq-mb-4" title="Community costs">
        <span style={{ color: aqBootstrapTheme.palette.info }}>
          💡 These parameters are read-only. Manage them in the
          <Button
            forwardedAs="a"
            href={`/backoffice/campaigns/${campaignId}/prospect`}
            kind="link"
            target="_blank"
          >
            <span style={{ color: aqBootstrapTheme.palette.info }}>
              Prospect section
            </span>
          </Button>
        </span>
        <div
          style={{
            display: "flex",
            gap: aqBootstrapTheme.grid.spacing.default,
            justifyContent: "center",
          }}
        >
          <BSCol size="col-6 col-lg-6 col-md-12 ">
            <div>
              Assistant Costs{" "}
              <span style={{ color: aqBootstrapTheme.palette.danger }}>*</span>
            </div>
            <Input
              id="assistant-costs"
              type="string"
              value={
                assistantTotal?.totalCost ? `${assistantTotal.totalCost}€` : ""
              }
              disabled
              placeholder="-"
            />
          </BSCol>
          <BSCol size="col-6 col-lg-6 col-md-12">
            <div>
              Tester Payouts{" "}
              <span style={{ color: aqBootstrapTheme.palette.danger }}>*</span>
            </div>
            <Input
              id="tester-payouts"
              type="string"
              value={testerTotal?.totalCost ? `${testerTotal.totalCost}€` : ""}
              disabled
              placeholder="-"
            />
          </BSCol>
        </div>
        <HorizontalDivider />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span>TOTAL COMMUNITY COSTS: </span>
          <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
            {(assistantTotal?.totalCost ?? 0) + (testerTotal?.totalCost ?? 0)}€
          </span>
        </div>
      </Card>
      <Card className="aq-mb-4" title="Human Resources cost">
        <HumanResources campaignId={campaignId || "0"} />
      </Card>
    </Section>
  );
};
