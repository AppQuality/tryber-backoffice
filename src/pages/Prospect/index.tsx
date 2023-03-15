import { useParams } from "react-router-dom";
import EdiTable from "./EdiTable";
import data from "./data";
import { useEffect, useState } from "react";

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
  const campaignData = {
    maxBonusBug: 15,
  };

  const [totals, setTotals] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Row[]>(
    data.map((d) => {
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
          d.payout.completion + d.payout.bug + d.payout.refund + d.payout.extra
        }`,
        completionPayout: d.payout.completion,
        bugPayout: d.payout.bug,
        refundPayout: d.payout.refund,
        extraPayout: d.payout.extra,
        totalExperience: `${d.experience.completion + d.experience.extra}`,
        completionExperience: d.experience.completion,
        extraExperience: d.experience.extra,
        notes: d.note,
      };
    })
  );

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
        columnHeaders={{
          height: 20,
          items: [
            { name: "Tester", span: 2 },
            { name: "Use Case", span: 2 },
            { name: "Bugs", span: 5 },
            { name: "Payout", span: 5 },
            { name: "Experience", span: 3 },
            { name: "Note" },
          ],
        }}
        columns={[
          { name: "TID", key: "testerId", type: "uneditable" },
          { name: "Name", key: "tester", width: 100, type: "uneditable" },
          { name: "Done", key: "useCaseCompleted", type: "uneditable" },
          { name: "Required", key: "useCaseTotal", type: "uneditable" },
          { name: "Tot.b", key: "totalBugs", type: "uneditable" },
          { name: "Critical", key: "criticalBugs", type: "uneditable" },
          { name: "High", key: "highBugs", type: "uneditable" },
          { name: "Medium", key: "mediumBugs", type: "uneditable" },
          { name: "Low", key: "lowBugs", type: "uneditable" },
          { name: "Tot.p", key: "totalPayout", type: "uneditable" },
          { name: "Compl.p", key: "completionPayout" },
          { name: "Bug", key: "bugPayout" },
          { name: "Refund", key: "refundPayout" },
          { name: "Extra", key: "extraPayout" },
          { name: "Tot.xp", key: "totalExperience", type: "uneditable" },
          { name: "Compl.xp", key: "completionExperience" },
          { name: "Extra XP", key: "extraExperience" },
          { name: "Note", key: "notes", width: 200 },
        ]}
        bottom={[
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
          {
            testerId: "AVERAGE",
            tester: "",
            useCaseCompleted: "",
            useCaseTotal: "",
            totalBugs: "",
            criticalBugs: "",
            highBugs: "",
            mediumBugs: "",
            lowBugs: "",
            totalPayout: `${round(totals.totalPayout / items.length)}`,
            completionPayout: `${round(
              totals.completionPayout / items.length
            )}`,
            bugPayout: `${round(totals.bugPayout / items.length)}`,
            refundPayout: `${round(totals.refundPayout / items.length)}`,
            extraPayout: `${round(totals.extraPayout / items.length)}`,
            totalExperience: `${round(totals.totalExperience / items.length)}`,
            completionExperience: `${round(
              totals.completionExperience / items.length
            )}`,
            extraExperience: `${round(totals.extraExperience / items.length)}`,

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
