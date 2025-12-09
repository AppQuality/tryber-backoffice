import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  Input,
} from "@appquality/appquality-design-system";
import { Section } from "../../components/campaignForm/Section";
import { HorizontalDivider } from "../components/Dividers";

type CostAndResourceDetailsSectionProps = {
  campaignId?: string;
};

export const CostAndResourceDetailsSection = ({
  campaignId,
}: CostAndResourceDetailsSectionProps) => {
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
            href={`/backoffice/${campaignId}/prospect`}
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
              value=""
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
              value=""
              disabled
              placeholder="-"
            />
          </BSCol>
        </div>
        <HorizontalDivider />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span>TOTAL COMMUNITY COSTS: </span>
          <span style={{ fontWeight: "bold", marginLeft: "4px" }}>--€</span>
        </div>
      </Card>
      <Card className="aq-mb-4" title="Human Resources cost">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <span style={{ color: aqBootstrapTheme.palette.info }}>
            💡
            <span style={{ fontWeight: "bold" }}>
              Add Human Resources
            </span> and{" "}
            <span style={{ fontWeight: "bold" }}>fill all required fields</span>{" "}
            (*) to enable saving
          </span>
          <div>
            <Button
              forwardedAs="a"
              href={`/backoffice/${campaignId}/prospect`}
              kind="link"
              target="_blank"
            >
              + Add Human Resources
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
};
