import { Pill } from "@appquality/appquality-design-system";

export const getQuoteStatusPill = (
  quoteStatus: string // "pending" | "proposed" | "approved" | "rejected"
) => {
  switch (quoteStatus) {
    case "proposed":
      return <Pill type="warning">Proposed</Pill>;
    case "approved":
      return <Pill type="success">Approved</Pill>;
    case "rejected":
      return <Pill type="danger">Rejected</Pill>;
    default:
      return <Pill type="primary">Estimated</Pill>;
  }
};
