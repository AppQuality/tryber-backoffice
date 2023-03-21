import { useParams } from "react-router-dom";
import EdiTable from "./EdiTable";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignProspectQuery } from "src/services/tryberApi";
import { Button } from "@appquality/appquality-design-system";

type Row = {
  testerId: string;
  tester: string;
  useCaseCompleted: string;
  useCaseTotal: string;
  totalBugs: string;
  criticalBugs: string;
  highBugs: string;
  mediumBugs: string;
  lowBugs: string;
  totalPayout: string;
  completionPayout: number;
  bugPayout: number;
  refundPayout: number;
  extraPayout: number;
  totalExperience: string;
  completionExperience: number;
  extraExperience: number;
  notes: string;
};

const round = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const MyEdiTable = EdiTable<Row>;

const Prospect = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetCampaignsByCampaignProspectQuery({
    campaign: id,
  });

  const [totals, setTotals] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Row[]>([]);

  useEffect(() => {
    if (data) {
      const items = data.items.map((d) => {
        return {
          testerId: `T${d.tester.id}`,
          tester: `${d.tester.name} ${d.tester.surname.charAt(0)}.`,
          useCaseCompleted: `${d.usecases.completed}`,
          useCaseTotal: `${d.usecases.required}`,
          totalBugs: `${
            d.bugs.critical + d.bugs.high + d.bugs.medium + d.bugs.low
          }`,
          criticalBugs: `${d.bugs.critical}`,
          highBugs: `${d.bugs.high}`,
          mediumBugs: `${d.bugs.medium}`,
          lowBugs: `${d.bugs.low}`,
          totalPayout: `${
            d.payout.completion +
            d.payout.bug +
            d.payout.refund +
            d.payout.extra
          }`,
          completionPayout: d.payout.completion,
          bugPayout: d.payout.bug,
          refundPayout: d.payout.refund,
          extraPayout: d.payout.extra,
          totalExperience: `${d.experience.completion + d.experience.extra}`,
          completionExperience: d.experience.completion,
          extraExperience: d.experience.extra,
          notes: d.note,
          style:
            d.bugs.critical + d.bugs.high + d.bugs.medium + d.bugs.low < 2
              ? {
                  backgroundColor: "pink",
                  borderColor: "red",
                }
              : {},
        };
      });
      setItems(items);
    }
  }, [data]);

  useEffect(() => {
    setTotals({
      totalPayout: items.reduce((acc, i) => acc + Number(i.totalPayout), 0),
      completionPayout: items.reduce(
        (acc, i) => acc + Number(i.completionPayout),
        0
      ),
      bugPayout: items.reduce((acc, i) => acc + Number(i.bugPayout), 0),
      refundPayout: items.reduce((acc, i) => acc + Number(i.refundPayout), 0),
      extraPayout: items.reduce((acc, i) => acc + Number(i.extraPayout), 0),
      totalExperience: items.reduce(
        (acc, i) => acc + Number(i.totalExperience),
        0
      ),
      completionExperience: items.reduce(
        (acc, i) => acc + Number(i.completionExperience),
        0
      ),
      extraExperience: items.reduce(
        (acc, i) => acc + Number(i.extraExperience),
        0
      ),
    });
  }, [items]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const campaignData = {
    maxBonusBug: 15,
  };

  return (
    <>
      <MyEdiTable
        onRowChange={(row) => {
          setItems((oldItems) => {
            const index = oldItems.findIndex(
              (i) => i.testerId === row.testerId
            );
            if (row.bugPayout > campaignData.maxBonusBug) {
              row.bugPayout = campaignData.maxBonusBug;
            }
            oldItems[index].totalPayout = `${
              row.completionPayout +
              row.bugPayout +
              row.refundPayout +
              row.extraPayout
            }`;
            oldItems[index].totalExperience = `${
              row.completionExperience + row.extraExperience
            }`;
            return [...oldItems];
          });
        }}
        onChange={(changes) => {}}
        columns={[
          {
            name: "TID",
            key: "testerId",
            type: "uneditable",
            children: (
              <Button onClick={() => alert("Clicked on TID")}>TID</Button>
            ),
          },
          { name: "Name", key: "tester", width: 150, type: "uneditable" },
          { name: "Done", key: "useCaseCompleted", type: "uneditable" },
          { name: "Required", key: "useCaseTotal", type: "uneditable" },
          {
            name: "Bug Trovati",
            key: "totalBugs",
            width: 90,
            type: "uneditable",
          },
          {
            name: "Critical",
            key: "criticalBugs",
            width: 65,
            type: "uneditable",
            children: (
              <div
                style={{
                  backgroundColor: "pink",
                  height: "100%",
                  display: "grid",
                  alignItems: "center",
                }}
              >
                Critical
              </div>
            ),
          },
          { name: "High", key: "highBugs", width: 65, type: "uneditable" },
          { name: "Medium", key: "mediumBugs", width: 65, type: "uneditable" },
          { name: "Low", key: "lowBugs", width: 65, type: "uneditable" },
          {
            name: "Paga Totale",
            key: "totalPayout",
            width: 90,
            type: "uneditable",
          },
          { name: "Test", key: "completionPayout" },
          { name: "Bonus Bug", width: 90, key: "bugPayout" },
          { name: "Rimborso", key: "refundPayout" },
          { name: "Extra", key: "extraPayout" },
          { name: "XP Totali", key: "totalExperience", type: "uneditable" },
          { name: "XP Base", key: "completionExperience" },
          { name: "Extra XP", key: "extraExperience" },
          { name: "Note", key: "notes", width: 200 },
        ]}
        subHeader={[
          {
            testerId: "TOTAL",
            tester: "",
            useCaseCompleted: "",
            useCaseTotal: "",
            totalBugs: "",
            criticalBugs: "",
            highBugs: "",
            mediumBugs: "",
            lowBugs: "",
            totalPayout: `${totals.totalPayout}`,
            completionPayout: `${totals.completionPayout}`,
            bugPayout: `${totals.bugPayout}`,
            refundPayout: `${totals.refundPayout}`,
            extraPayout: `${totals.extraPayout}`,
            totalExperience: `${totals.totalExperience}`,
            completionExperience: `${totals.completionExperience}`,
            extraExperience: `${totals.extraExperience}`,
            notes: "",
          },
        ]}
        data={items}
      />
      MAX BONUS BUG: {campaignData.maxBonusBug}
    </>
  );
};

export default Prospect;
