import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  Text,
  Input,
  Select,
} from "@appquality/appquality-design-system";
import { styled } from "styled-components";
import { Section } from "../../components/campaignForm/Section";
import { HorizontalDivider } from "../components/Dividers";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";

const StyledRow = styled.div`
  margin-top: ${({ theme }) => theme.grid.spacing.default};
  display: flex;
  gap: ${({ theme }) => theme.grid.sizes[4]};
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.grid.sizes[3]};

  > div:not(:last-child) {
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;
    min-width: 0;
  }

  > div:last-child {
    flex: 0;
  }
`;

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

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
        <span style={{ color: aqBootstrapTheme.palette.info }}>
          💡
          <span style={{ fontWeight: "bold" }}>
            Add Human Resources
          </span> and{" "}
          <span style={{ fontWeight: "bold" }}>fill all required fields</span>{" "}
          (*) to enable saving
        </span>
        <StyledRow>
          <div>
            <Text>
              Assignee <span style={{ color: "red" }}>*</span>
            </Text>
            <Select
              placeholder={"-"}
              menuTargetQuery={"body"}
              name={"assignee-select"}
              options={options}
              label={""}
              value={[]}
              onChange={(newOptions) => {}}
              noOptionsMessage={() => "No options"}
            />
          </div>
          <div>
            <Text>
              Workdays <span style={{ color: "red" }}>*</span>
            </Text>
            <Select
              placeholder={"-"}
              menuTargetQuery={"body"}
              name={"workdays-select"}
              options={options}
              label={""}
              value={[]}
              onChange={(newOptions) => {}}
              noOptionsMessage={() => "No options"}
            />
          </div>
          <div>
            <Text>
              Daily rate <span style={{ color: "red" }}>*</span>
            </Text>
            <Select
              placeholder={"-"}
              menuTargetQuery={"body"}
              name={"dailyrate-select"}
              options={options}
              label={""}
              value={[]}
              onChange={(newOptions) => {}}
              noOptionsMessage={() => "No options"}
            />
          </div>
          <div>
            <Button size="sm" kind="danger" onClick={() => {}}>
              <DeleteIcon />
            </Button>
          </div>
        </StyledRow>
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
      </Card>
    </Section>
  );
};
