import {
  aqBootstrapTheme,
  BSCol,
  BSGrid,
  Card,
  Steps,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { styled } from "styled-components";
import { QuoteInput } from "./QuoteInput";
import { useQuoteRecap } from "./useQuoteRecap";
import { QuoteHistorySection } from "./sections/QuoteHistorySection";
import { RevenueOverviewSection } from "./sections/RevenueOverviewSection";
import { CostAndResourceDetailsSection } from "./sections/CostAndResourceDetailsSection";

const FullGrid = styled(BSGrid)`
  width: 100%;
`;

const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 0;
  }
`;

const HorizontalDivider = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
  height: 1px;
  background: #ccc;
`;

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuoteRecap({ campaign: Number(id) });

  return (
    <PageTemplate>
      <FullGrid>
        <BSCol size="col-lg-8">
          <QuoteHistorySection
            history={data.history}
            otherCampaigns={data.otherCampaigns}
          />

          <RevenueOverviewSection />

          <CostAndResourceDetailsSection campaignId={id} />
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
              <Card className="aq-mb-4" title="Form Section">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Steps className="aq-m-3" current={0} direction="vertical">
                    <Steps.Step
                      description=""
                      isCompleted
                      title="History activity quotation"
                    />
                    <Steps.Step description="" title="Revenue details" />
                    <Steps.Step
                      description=""
                      title="Cost & Resource details"
                    />
                  </Steps>
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
