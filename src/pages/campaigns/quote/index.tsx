import {
  Accordion,
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  Button,
  Card,
  Dropdown,
  Input,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { styled } from "styled-components";
import { Section } from "../components/campaignForm/Section";
import { QuoteInput } from "./QuoteInput";
import { QuoteTable } from "./QuoteRecap";
import { useQuoteRecap } from "./useQuoteRecap";

const FullGrid = styled(BSGrid)`
  width: 100%;
`;

const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 0;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 3em;
  background: #ccc;
`;

const HorizontalDivider = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
  height: 1px;
  background: #ccc;
`;

const saveButtonContainer = (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Button kind="primary" size="sm">
      Save
    </Button>
  </div>
);

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuoteRecap({ campaign: Number(id) });

  return (
    <PageTemplate>
      <FullGrid>
        <BSCol size="col-lg-8">
          <Section
            title="Quote History"
            subtitle="Review past quotes for this campaign or compare with similar templates to ensure accurate pricing"
            id="quote"
          >
            <Card className="aq-mb-4" title="Quote history & comparison">
              <Accordion initialActive={""} id="quote-history-accordion">
                <Accordion.Item
                  id="quote-history-campaign"
                  title="Previous quotes for this campaign"
                  key={"campaign-quotes"}
                >
                  {data.history.length > 0 && (
                    <QuoteTable data={data.history} />
                  )}
                </Accordion.Item>
                <Accordion.Item
                  id="quote-history-template-workspace"
                  title="All other quotes for this template in this workspace"
                  key={"other-quotes"}
                >
                  {data.otherCampaigns.length > 0 ? (
                    <QuoteTable data={data.otherCampaigns} />
                  ) : (
                    <div>This is the first quote for this workspace.</div>
                  )}
                </Accordion.Item>
              </Accordion>
            </Card>
          </Section>
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
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
                  </div>
                  <Input
                    id="token-used"
                    type="string"
                    value=""
                    placeholder="E.g. 10"
                  />
                </BSCol>
                <BSCol size="col-6 col-lg-6 col-md-12">
                  <div>
                    Linked agreement{" "}
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
                  </div>
                  <Dropdown
                    name="agreement-dropdown"
                    placeholder="Choose an agreement..."
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
                  href={`/backoffice/${id}/prospect`}
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
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
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
                    <span style={{ color: aqBootstrapTheme.palette.danger }}>
                      *
                    </span>
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
                <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                  --€
                </span>
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
                  </span>{" "}
                  and{" "}
                  <span style={{ fontWeight: "bold" }}>
                    fill all required fields
                  </span>{" "}
                  (*) to enable saving
                </span>
                <div>
                  <Button
                    forwardedAs="a"
                    href={`/backoffice/${id}/prospect`}
                    kind="link"
                    target="_blank"
                  >
                    + Add Human Resources
                  </Button>
                </div>
              </div>
            </Card>
          </Section>
        </BSCol>
        <BSCol size="col-lg-4">
          <StickyContainer>
            <div className="aq-mb-4">
              <QuoteInput campaignId={id} />
              <Card className="aq-mb-4" title="Summary finance">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: aqBootstrapTheme.palette.primary,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      📥 TOTAL REVENUE:{" "}
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: aqBootstrapTheme.palette.secondary,
                      }}
                    >
                      --€
                    </span>
                  </div>
                  <div
                    style={{
                      color: aqBootstrapTheme.palette.primary,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginTop: "12px" }}>Community costs: </span>
                    <span
                      style={{
                        color: aqBootstrapTheme.palette.primary,
                      }}
                    >
                      --€
                    </span>
                  </div>
                  <div
                    style={{
                      color: aqBootstrapTheme.palette.primary,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Human Resource costs: </span>
                    <span
                      style={{
                        color: aqBootstrapTheme.palette.primary,
                      }}
                    >
                      --€
                    </span>
                  </div>
                  <HorizontalDivider />
                  <div
                    style={{
                      color: aqBootstrapTheme.palette.primary,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>📥 TOTAL COST: </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: aqBootstrapTheme.palette.primary,
                      }}
                    >
                      --€
                    </span>
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
                    <BSCol size="col-9">
                      <div
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          gap: "4px 25px",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontWeight:
                              aqBootstrapTheme.typography.fontWeight.bold,
                          }}
                        >
                          💰 GROSS MARGIN
                        </span>
                        <strong
                          style={{
                            fontSize: "24px",
                            fontWeight:
                              aqBootstrapTheme.typography.fontWeight.bold,
                            color: aqBootstrapTheme.colors.green,
                          }}
                        >
                          --%
                        </strong>
                      </div>
                    </BSCol>
                  </div>
                </div>
              </Card>
            </div>
          </StickyContainer>
        </BSCol>
      </FullGrid>
    </PageTemplate>
  );
};

export default EditCampaign;
