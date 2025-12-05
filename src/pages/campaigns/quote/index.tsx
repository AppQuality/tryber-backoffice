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
                <BSCol size="col-lg-6">
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
                <BSCol size="col-lg-6">
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
            </Card>
          </Section>
        </BSCol>
        <BSCol size="col-lg-4">
          <StickyContainer>
            <div className="aq-mb-4">
              <QuoteInput campaignId={id} />
            </div>
          </StickyContainer>
        </BSCol>
      </FullGrid>
    </PageTemplate>
  );
};

export default EditCampaign;
