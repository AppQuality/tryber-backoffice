import {
  aqBootstrapTheme,
  BSCol,
  Button,
  Card,
  Dropdown,
  Input,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router";
import { useGetDossiersByCampaignAgreementsQuery } from "src/services/tryberApi";
import { Section } from "../../components/campaignForm/Section";
import { VerticalDivider } from "../components/Dividers";

export const RevenueOverviewSection = () => {
  const saveButtonContainer = (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button kind="primary" size="sm">
        Save
      </Button>
    </div>
  );

  const { id } = useParams<{ id: string }>();
  const { data } = useGetDossiersByCampaignAgreementsQuery({ campaign: id });

  return (
    <Section
      title="Revenue Overview"
      subtitle="Track campaign revenue, token usage, and linked agreements"
      id="quote"
    >
      <Card className="aq-mb-4" title="Revenue details">
        <div
          style={{
            display: "flex",
            gap: aqBootstrapTheme.grid.spacing.default,
            justifyContent: "center",
          }}
        >
          <BSCol size="col-6 col-lg-6 col-md-12 ">
            <div>
              Token used{" "}
              <span style={{ color: aqBootstrapTheme.palette.danger }}>*</span>
            </div>
            <Input
              id="token-used"
              type="string"
              value={data ? data.tokens?.toString() : ""}
              placeholder="E.g. 10"
            />
          </BSCol>
          <BSCol size="col-6 col-lg-6 col-md-12">
            <div>
              Linked agreement{" "}
              <span style={{ color: aqBootstrapTheme.palette.danger }}>*</span>
            </div>
            <Dropdown
              name="agreement-dropdown"
              placeholder="Choose an agreement..."
              defaultValue={{
                label: data?.agreement?.id?.toString() || "",
                value: data?.agreement?.id?.toString() || "",
              }}
              options={[
                { label: "Agreement 1", value: "1" },
                { label: "Agreement 2", value: "2" },
              ]}
            />
            <Button
              forwardedAs="a"
              href="/backoffice/agreements/new"
              kind="link"
              target="_blank"
            >
              <span style={{ color: aqBootstrapTheme.palette.info }}>
                Agreement not found? Create a new one
              </span>
            </Button>
          </BSCol>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 24px 24px 30px",
            gap: "25px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <BSCol size="col-lg-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "4px 25px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                }}
              >
                TOKEN VALUE
              </span>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                  color: aqBootstrapTheme.palette.primary,
                }}
              >
                --€
              </strong>
            </div>
          </BSCol>
          <VerticalDivider />
          <BSCol size="col-lg-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "column",
                gap: "4px 25px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                }}
              >
                TOTAL REVENUE
              </span>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                  color: aqBootstrapTheme.palette.secondary,
                }}
              >
                --€
              </strong>
            </div>
          </BSCol>
        </div>
        {saveButtonContainer}
      </Card>
    </Section>
  );
};
