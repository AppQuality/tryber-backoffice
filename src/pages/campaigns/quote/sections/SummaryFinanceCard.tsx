import {
  aqBootstrapTheme,
  BSCol,
  Card,
} from "@appquality/appquality-design-system";
import { HorizontalDivider } from "../components/Dividers";

export const SummaryFinanceCard = () => {
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
          <span style={{ fontWeight: "bold" }}>📥 TOTAL REVENUE: </span>
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
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
                }}
              >
                💰 GROSS MARGIN
              </span>
              <strong
                style={{
                  fontSize: "24px",
                  fontWeight: aqBootstrapTheme.typography.fontWeight.bold,
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
  );
};
