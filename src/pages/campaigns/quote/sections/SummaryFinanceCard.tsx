import {
  aqBootstrapTheme,
  BSCol,
  Card,
  Skeleton,
  Title,
} from "@appquality/appquality-design-system";
import {
  useGetDossiersByCampaignAgreementsQuery,
  useGetDossiersByCampaignCostsQuery,
  useGetDossiersByCampaignHumanResourcesQuery,
} from "src/services/tryberApi";
import { HorizontalDivider } from "../components/Dividers";

export const SummaryFinanceCard = ({ campaignId }: { campaignId: string }) => {
  const { data: agreementData, isLoading: isAgreementDataLoading } =
    useGetDossiersByCampaignAgreementsQuery({
      campaign: campaignId,
    });

  const { data: communityCostsData, isLoading: isCommunityCostsDataLoading } =
    useGetDossiersByCampaignCostsQuery({
      campaign: campaignId,
      filterBy: { type: "1,2,3,4" },
    });

  const { data: hrCostsData, isLoading: isHrCostsDataLoading } =
    useGetDossiersByCampaignHumanResourcesQuery({
      campaign: campaignId,
    });

  const hrCostsTotal =
    hrCostsData?.items && hrCostsData?.items.length > 0
      ? hrCostsData.items.reduce(
          (acc, hr) => acc + (hr?.days ?? 0) * (hr?.rate?.value ?? 0),
          0
        )
      : 0;

  if (
    isAgreementDataLoading ||
    isCommunityCostsDataLoading ||
    isHrCostsDataLoading
  )
    return <Skeleton />;

  return (
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
          <Title size="s">📥 TOTAL REVENUE: </Title>
          <Title
            size="s"
            style={{
              color: aqBootstrapTheme.palette.secondary,
            }}
          >
            {agreementData?.tokens && agreementData?.agreement?.value
              ? `${(
                  agreementData.tokens * agreementData.agreement.value
                ).toFixed(2)}€`
              : "--€"}
          </Title>
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
            {communityCostsData?.totalCost
              ? `${communityCostsData.totalCost.toFixed(2)}€`
              : "--€"}
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
            {hrCostsTotal.toFixed(2)}€{" "}
          </span>
        </div>

        <HorizontalDivider />

        <div
          style={{
            color: aqBootstrapTheme.palette.primary,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Title size="s">📥 TOTAL COST: </Title>
          <Title
            size="s"
            style={{
              color: aqBootstrapTheme.palette.primary,
            }}
          >
            {((communityCostsData?.totalCost || 0) + hrCostsTotal).toFixed(2)}€
          </Title>
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
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                gap: "4px 25px",
                flexDirection: "row",
              }}
            >
              <Title size="s">💰 GROSS MARGIN</Title>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                  color: aqBootstrapTheme.colors.green,
                }}
              >
                {agreementData?.tokens && agreementData?.agreement?.value
                  ? `${(
                      ((agreementData.tokens * agreementData.agreement.value -
                        ((communityCostsData?.totalCost || 0) + hrCostsTotal)) /
                        (agreementData.tokens *
                          agreementData.agreement.value)) *
                      100
                    ).toFixed(2)}%`
                  : "--%"}
              </strong>
            </div>
          </BSCol>
        </div>
      </div>
    </Card>
  );
};
