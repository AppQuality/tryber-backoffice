import { useParams } from "react-router-dom";
import EdiTable from "./EdiTable";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignProspectQuery } from "src/services/tryberApi";
import { Button, Title } from "@appquality/appquality-design-system";
import styled from "styled-components";

const FluidContainer = styled.div`
    max-width: 90%;
    margin: 0 auto;
  }
`;

type Row = {
  isTopTester: boolean;
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

const MyEdiTable = EdiTable<Row>;

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  const [expanded, setExpanded] = useState({
    bugs: false,
    payout: false,
    experience: false,
  });
  const { data, isLoading } = useGetCampaignsByCampaignProspectQuery({
    campaign: id,
  });

  const [totals, setTotals] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Row[]>([]);

  useEffect(() => {
    if (data) {
      const items = data.items.map((d) => {
        return {
          isTopTester: d.isTopTester,
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
          style: !d.isCompleted
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
    <FluidContainer>
      <Title size="xl">Prospect</Title>
      <Title size="mt" className="aq-mb-3">
        Campaign {id}
      </Title>
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
            name: "★",
            key: "isTopTester",
            type: "star",
            children: <span style={{ fontSize: "24px" }}>★</span>,
            width: 25,
          },
          {
            name: "TID",
            key: "testerId",
            type: "uneditable",
          },
          { name: "Name", key: "tester", width: 150, type: "uneditable" },
          { name: "Done", key: "useCaseCompleted", type: "uneditable" },
          { name: "Required", key: "useCaseTotal", type: "uneditable" },
          {
            name: "Bug Trovati",
            key: "totalBugs",
            width: 90,
            type: "uneditable",
            children: (
              <Button
                type="link-hover"
                className="aq-p-1"
                onClick={() =>
                  setExpanded({
                    ...expanded,
                    bugs: !expanded.bugs,
                  })
                }
              >
                Bug Trovati
              </Button>
            ),
          },
          ...(expanded.bugs
            ? [
                {
                  name: "Critical",
                  key: "criticalBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
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
                {
                  name: "High",
                  key: "highBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                },
                {
                  name: "Medium",
                  key: "mediumBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                },
                {
                  name: "Low",
                  key: "lowBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                },
              ]
            : []),
          {
            name: "Paga Totale",
            key: "totalPayout",
            width: 90,
            type: "uneditable",
            children: (
              <Button
                type="link-hover"
                className="aq-p-1"
                onClick={() =>
                  setExpanded({
                    ...expanded,
                    payout: !expanded.payout,
                  })
                }
              >
                Paga Totale
              </Button>
            ),
          },
          ...(expanded.payout
            ? [
                { name: "Test", key: "completionPayout" as const },
                { name: "Bonus Bug", width: 90, key: "bugPayout" as const },
                { name: "Rimborso", key: "refundPayout" as const },
                { name: "Extra", key: "extraPayout" as const },
              ]
            : []),
          {
            name: "XP Totali",
            key: "totalExperience",
            type: "uneditable",
            children: (
              <Button
                type="link-hover"
                className="aq-p-1"
                onClick={() =>
                  setExpanded({
                    ...expanded,
                    experience: !expanded.experience,
                  })
                }
              >
                XP Totali
              </Button>
            ),
          },
          ...(expanded.experience
            ? [
                { name: "XP Base", key: "completionExperience" as const },
                { name: "Extra XP", key: "extraExperience" as const },
              ]
            : []),
          { name: "Note", key: "notes", width: 200 },
        ]}
        subHeader={[
          {
            isTopTester: false,
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
            completionPayout: totals.completionPayout,
            bugPayout: totals.bugPayout,
            refundPayout: totals.refundPayout,
            extraPayout: totals.extraPayout,
            totalExperience: `${totals.totalExperience}`,
            completionExperience: totals.completionExperience,
            extraExperience: totals.extraExperience,
            notes: "",
          },
        ]}
        data={items}
      />
      MAX BONUS BUG: {campaignData.maxBonusBug}
    </FluidContainer>
  );
};

export default Prospect;
