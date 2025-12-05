import { Button, Table } from "@appquality/appquality-design-system";
import React from "react";
import openInWordpress from "src/utils/openInWordpress";
import { getQuoteStatusPill } from "./statusPill";

export type QuoteTableRow = {
  campaignId: number;
  campaign: string;
  phase: string;
  amount: string;
  quoteStatus: string;
};

export const QuoteTable = ({ data }: { data: QuoteTableRow[] }) => {
  return (
    <Table
      isStriped
      dataSource={
        data.map((d) => ({
          campaign: {
            title: d.campaign,
            content: (
              <Button
                kind="link-hover"
                onClick={(e) =>
                  openInWordpress(e, "open-edit", { id: d.campaignId })
                }
                style={{ padding: 0 }}
              >
                {d.campaign}
              </Button>
            ),
          },
          phase: d.phase,
          amount: d.amount,
          quoteStatus: {
            title: d.quoteStatus,
            content: getQuoteStatusPill(d.quoteStatus),
          },
          key: d.campaignId,
        })) || []
      }
      columns={[
        {
          title: "Campaign",
          dataIndex: "campaign",
          key: "campaign",
        },
        {
          title: "Phase",
          dataIndex: "phase",
          key: "phase",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Quote status",
          dataIndex: "quoteStatus",
          key: "quoteStatus",
        },
      ]}
    />
  );
};
