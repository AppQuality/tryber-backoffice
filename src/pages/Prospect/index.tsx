import { useParams } from "react-router-dom";
import EdiTable from "./EdiTable";
import { useEffect, useState } from "react";
import {
  useGetCampaignsByCampaignProspectQuery,
  usePutCampaignsByCampaignProspectAndTesterIdMutation,
  useGetCampaignsByCampaignPayoutsQuery,
  usePatchCampaignsByCampaignProspectMutation,
} from "src/services/tryberApi";
import {
  Button,
  Title,
  aqBootstrapTheme,
  icons,
} from "@appquality/appquality-design-system";
import styled from "styled-components";
import { CellStyle } from "./EdiTable/types";
import { MessageWrapper } from "./MessageWrapper";
import { Row } from "./types";
import euroRenderer from "./euroRenderer";

const { TrophyFill } = icons;

const FluidContainer = styled.div`
    max-width: 90%;
    margin: 0 auto;
  }
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" type="link-hover" />;
};

const EdiTableWithType = EdiTable<Row>;

const MyEdiTable = styled(EdiTableWithType)`
  .subheader {
    background-color: ${({ theme }) => theme.colors.purple100} !important;
  }
  .rg-customHeader-cell {
    background-color: ${({ theme }) => theme.colors.white} !important;
  }
`;

const ColoredCell = styled.div<{
  color: keyof (typeof aqBootstrapTheme)["colors"];
}>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  height: 100%;
  display: grid;
  align-items: center;
`;

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  const [isPaying, setIsPaying] = useState(false);
  const [expanded, setExpanded] = useState({
    usecases: false,
    bugs: false,
    payout: false,
    experience: false,
  });
  const { data, isLoading, error } = useGetCampaignsByCampaignProspectQuery({
    campaign: id,
  });
  const { data: payouts, isLoading: isLoadingPayouts } =
    useGetCampaignsByCampaignPayoutsQuery({
      campaign: id,
    });
  const [updateTester] = usePutCampaignsByCampaignProspectAndTesterIdMutation();
  const [payTesters] = usePatchCampaignsByCampaignProspectMutation();

  const [totals, setTotals] = useState<Record<string, number>>({});
  const [items, setItems] = useState<(Row & CellStyle)[]>([]);

  function updateTotals(oldItem: Row & CellStyle, newItem: Row) {
    oldItem.totalPayout = `${
      newItem.completionPayout +
      newItem.bugPayout +
      newItem.refundPayout +
      newItem.extraPayout
    }`;
    oldItem.totalExperience = `${
      newItem.completionExperience + newItem.extraExperience
    }`;

    oldItem.style =
      newItem.completed === "Pagabile"
        ? {}
        : {
            backgroundColor: aqBootstrapTheme.colors.red100,
            borderColor: aqBootstrapTheme.colors.red200,
            color: aqBootstrapTheme.colors.red800,
          };
  }

  useEffect(() => {
    if (data) {
      const items = data.items.map((d) => {
        return {
          isTopTester: d.isTopTester,
          testerId: `T${d.tester.id}`,
          tester: `${d.tester.name} ${d.tester.surname}`,
          completed: d.isCompleted ? "Pagabile" : "No",
          useCaseCompleted: `${d.usecases.completed}/`,
          useCaseTotal: `${d.usecases.required} UC`,
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
          status: d.status,
          style: !d.isCompleted
            ? {
                backgroundColor: aqBootstrapTheme.colors.red100,
                borderColor: aqBootstrapTheme.colors.red200,
                color: aqBootstrapTheme.colors.red800,
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
  if (isLoading || isLoadingPayouts) {
    return <MessageWrapper>Loading...</MessageWrapper>;
  }

  if (error && "status" in error && error.status === 412) {
    return (
      <MessageWrapper>
        It looks like there's an edit on the old prospect
      </MessageWrapper>
    );
  }

  if (!payouts || !data) {
    return (
      <MessageWrapper>There was an error loading campaign data</MessageWrapper>
    );
  }

  const isDone = data.items.some((p) => p.status === "done");

  return (
    <FluidContainer>
      <Title size="xl">Prospect</Title>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=cp-prospect&id=${id}`}
        type="secondary"
        className="aq-mr-2"
      >
        {"<"} Go to old Prospect
      </HeaderButton>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=cp-prospect-crowd&id=${id}`}
        className="aq-mr-2"
      >
        Go to Assistant
      </HeaderButton>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=add-booty&cid=${id}`}
        className="aq-mr-2"
      >
        Go to Add Booty
      </HeaderButton>
      <Title size="mt" className="aq-mb-3">
        Campaign {id}
      </Title>
      <Button
        type="primary"
        onClick={() => {
          const testerToPay = items
            .map((i) => ({
              tester: {
                id: Number(i.testerId.replace("T", "")),
              },
              experience: {
                completion: i.completionExperience,
                extra: i.extraExperience,
              },
              payout: {
                completion: i.completionPayout,
                bug: i.bugPayout,
                extra: i.extraPayout,
                refund: i.refundPayout,
              },
              note: i.notes,
              completed: i.completed === "Pagabile",
            }))
            .filter((i) => i.tester.id > 0);
          if (
            window.confirm(
              `You are about to pay ${testerToPay.length} testers. Are you sure?`
            )
          ) {
            setIsPaying(true);
            payTesters({
              campaign: id,
              body: {
                status: "done",
                items: testerToPay,
              },
            })
              .unwrap()
              .finally(() => {
                setIsPaying(false);
              });
          }
        }}
        disabled={isPaying || isDone}
      >
        {isPaying ? "Paying..." : "Pay Testers"}
      </Button>
      <MyEdiTable
        onRowChange={(row) => {
          updateTester({
            campaign: id,
            testerId: row.testerId.replace("T", ""),
            body: {
              payout: {
                completion: row.completionPayout,
                bugs: row.bugPayout,
                refund: row.refundPayout,
                extra: row.extraPayout,
              },
              experience: {
                completion: row.completionExperience,
                extra: row.extraExperience,
              },
              note: row.notes,
              completed: row.completed === "Pagabile" ? true : false,
            },
          })
            .unwrap()
            .then((res) => {
              setItems((oldItems) => {
                const index = oldItems.findIndex(
                  (i) => i.testerId === row.testerId
                );
                if (row.bugPayout > payouts.maxBonusBug) {
                  row.bugPayout = payouts.maxBonusBug;
                }
                const oldItem = oldItems[index];
                updateTotals(oldItem, row);
                return [...oldItems];
              });
            });
        }}
        onChange={(changes) => {}}
        columns={[
          {
            name: "★",
            key: "isTopTester",
            type: "star",
            children: (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  display: "grid",
                }}
              >
                <TrophyFill />
              </div>
            ),
            width: 25,
          },
          {
            name: "TID",
            key: "testerId",
            type: "uneditable",
          },
          { name: "Name", key: "tester", width: 150, type: "uneditable" },
          {
            name: "Esito",
            key: "completed",
            type: "uneditable",
            children: (
              <Button
                type="link-hover"
                className="aq-p-1"
                onClick={() =>
                  setExpanded({
                    ...expanded,
                    usecases: !expanded.usecases,
                  })
                }
              >
                Esito
              </Button>
            ),
          },
          ...(expanded.usecases
            ? [
                {
                  name: "Done",
                  key: "useCaseCompleted" as const,
                  type: "uneditable" as const,
                },
                {
                  name: "Required",
                  key: "useCaseTotal" as const,
                  type: "uneditable" as const,
                },
              ]
            : []),
          {
            name: "Bug Trovati",
            key: "totalBugs",
            width: 90,
            type: "uneditable",
            children: (
              <ColoredCell color="orange200">
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
              </ColoredCell>
            ),
          },
          ...(expanded.bugs
            ? [
                {
                  name: "Low",
                  key: "lowBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                  children: <ColoredCell color="orange100">Low</ColoredCell>,
                },
                {
                  name: "Medium",
                  key: "mediumBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                  children: <ColoredCell color="orange100">Medium</ColoredCell>,
                },
                {
                  name: "High",
                  key: "highBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                  children: <ColoredCell color="orange100">High</ColoredCell>,
                },
                {
                  name: "Critical",
                  key: "criticalBugs" as const,
                  width: 65,
                  type: "uneditable" as const,
                  children: (
                    <ColoredCell color="orange100">Critical</ColoredCell>
                  ),
                },
              ]
            : []),
          {
            name: "Paga Totale",
            key: "totalPayout",
            width: 90,
            type: "uneditable",
            renderer: euroRenderer,
            children: (
              <ColoredCell color="green200">
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
              </ColoredCell>
            ),
          },
          ...(expanded.payout
            ? [
                {
                  name: "Test",
                  type: "number" as const,
                  key: "completionPayout" as const,
                  renderer: euroRenderer,
                  children: <ColoredCell color="green100">Test</ColoredCell>,
                },
                {
                  name: "Bonus Bug",
                  type: "number" as const,
                  width: 90,
                  key: "bugPayout" as const,
                  renderer: euroRenderer,
                  children: (
                    <ColoredCell color="green100">Bonus Bug</ColoredCell>
                  ),
                },
                {
                  name: "Rimborso",
                  type: "number" as const,
                  key: "refundPayout" as const,
                  renderer: euroRenderer,
                  children: (
                    <ColoredCell color="green100">Rimborso</ColoredCell>
                  ),
                },
                {
                  name: "Extra",
                  type: "number" as const,
                  key: "extraPayout" as const,
                  renderer: euroRenderer,
                  children: <ColoredCell color="green100">Extra</ColoredCell>,
                },
              ]
            : []),
          {
            name: "XP Totali",
            key: "totalExperience",
            type: "uneditable",
            children: (
              <ColoredCell color="blue200">
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
              </ColoredCell>
            ),
          },
          ...(expanded.experience
            ? [
                {
                  name: "XP Base",
                  type: "number" as const,
                  key: "completionExperience" as const,
                  children: <ColoredCell color="blue100">XP Base</ColoredCell>,
                },
                {
                  name: "Extra XP",
                  type: "number" as const,
                  key: "extraExperience" as const,
                  children: <ColoredCell color="blue100">Extra</ColoredCell>,
                },
              ]
            : []),
          { name: "Note", type: "text", key: "notes", width: 200 },
          { name: "Status", key: "status", type: "uneditable" },
        ]}
        subHeader={[
          {
            isTopTester: false,
            testerId: "TOTAL",
            tester: "",
            completed: "",
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
            status: "",
          },
        ]}
        data={items}
        contextMenu={[
          {
            label: "Segna come pagati",
            handler: (items) => {
              for (const row of items) {
                updateTester({
                  campaign: id,
                  testerId: row.testerId.replace("T", ""),
                  body: {
                    payout: {
                      completion: payouts.testSuccess.payout,
                      bugs: row.bugPayout,
                      refund: row.refundPayout,
                      extra: row.extraPayout,
                    },
                    experience: {
                      completion: payouts.testSuccess.points,
                      extra: row.extraExperience,
                    },
                    note: row.notes,
                    completed: true,
                  },
                })
                  .unwrap()
                  .then((res) => {
                    setItems((oldItems) => {
                      const index = oldItems.findIndex(
                        (i) => i.testerId === row.testerId
                      );
                      const oldItem = oldItems[index];
                      oldItem.completionPayout = payouts.testSuccess.payout;
                      oldItem.completionExperience = payouts.testSuccess.points;
                      oldItem.completed = "Pagabile";
                      updateTotals(oldItem, oldItem);
                      return [...oldItems];
                    });
                  });
              }
            },
          },
          {
            label: "Segna come da non pagare",
            handler: (items) => {
              for (const row of items) {
                updateTester({
                  campaign: id,
                  testerId: row.testerId.replace("T", ""),
                  body: {
                    payout: {
                      completion: payouts.testFailure.payout,
                      bugs: row.bugPayout,
                      refund: row.refundPayout,
                      extra: row.extraPayout,
                    },
                    experience: {
                      completion: payouts.testFailure.points,
                      extra: row.extraExperience,
                    },
                    note: row.notes,
                    completed: false,
                  },
                })
                  .unwrap()
                  .then((res) => {
                    setItems((oldItems) => {
                      const index = oldItems.findIndex(
                        (i) => i.testerId === row.testerId
                      );
                      const oldItem = oldItems[index];
                      oldItem.completionPayout = payouts.testFailure.payout;
                      oldItem.completionExperience = payouts.testFailure.points;
                      oldItem.completed = "No";
                      updateTotals(oldItem, oldItem);
                      return [...oldItems];
                    });
                  });
              }
            },
          },
        ]}
      />
      MAX BONUS BUG: {payouts.maxBonusBug}
    </FluidContainer>
  );
};

export default Prospect;
