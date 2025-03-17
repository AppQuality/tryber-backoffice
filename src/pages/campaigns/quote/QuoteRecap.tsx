import { Table } from "@appquality/appquality-design-system";

export const QuoteTable = ({
  data,
}: {
  data: {
    campaign: string;
    phase: string;
    amount: string;
    quoteStatus: string;
  }[];
}) => {
  return (
    <Table
      isStriped
      dataSource={
        data.map((d) => ({
          campaign: d.campaign,
          phase: d.phase,
          amount: d.amount,
          quoteStatus: d.quoteStatus,
          key: d.campaign,
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
