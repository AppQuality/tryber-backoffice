import EdiTable from "../EdiTable";
import { useEffect, useState } from "react";
import {
  useGetCampaignsByCampaignProspectQuery,
  usePutCampaignsByCampaignProspectAndTesterIdMutation,
  useGetCampaignsByCampaignPayoutsQuery,
  usePatchCampaignsByCampaignProspectMutation,
} from "src/services/tryberApi";
import {
  Button,
  aqBootstrapTheme,
  icons,
} from "@appquality/appquality-design-system";
import styled from "styled-components";
import { CellStyle } from "../EdiTable/types";
import { MessageWrapper } from "./MessageWrapper";
import { Row } from "../types";
import { euroRenderer, bugRenderer, pointsRenderer } from "./cellRenderer";
import OpenableColumnButton from "./OpenableColumnButton";
import ErrorHandler from "./ErrorHandler";
import ActionBar from "./ActionBar";
import InfoDrawer from "./InfoDrawer";
import useCanPay from "./useCanPay";

const { TrophyFill } = icons;

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

const Table = ({
  id,
  containerWidth,
}: {
  id: string;
  containerWidth: number;
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const canPay = useCanPay(id);

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
      newItem.completed === "Payable"
        ? {}
        : {
            backgroundColor: aqBootstrapTheme.colors.red100,
            borderColor: aqBootstrapTheme.colors.red200,
            color: aqBootstrapTheme.colors.red800,
          };
  }

  function setToPaymentStatus(rows: Row[], success: boolean) {
    if (!payouts) return;
    const payoutData = success
      ? {
          payout: payouts.testSuccess.payout,
          experience: payouts.testSuccess.points,
          note: payouts.testSuccess.message,
        }
      : {
          payout: payouts.testFailure.payout,
          experience: payouts.testFailure.points,
          note: payouts.testFailure.message,
        };
    for (const row of rows) {
      updateTester({
        campaign: id,
        testerId: row.testerId.replace("T", ""),
        body: {
          payout: {
            completion: payoutData.payout,
            bugs: row.bugPayout,
            refund: row.refundPayout,
            extra: row.extraPayout,
          },
          experience: {
            completion: payoutData.experience,
            extra: row.extraExperience,
          },
          note: payoutData.note,
          completed: success,
        },
      })
        .unwrap()
        .then((res) => {
          setItems((oldItems) => {
            const index = oldItems.findIndex(
              (i) => i.testerId === row.testerId
            );
            const oldItem = oldItems[index];
            oldItem.completionPayout = payoutData.payout;
            oldItem.completionExperience = payoutData.experience;
            oldItem.notes = payoutData.note;
            oldItem.completed = success ? "Payable" : "No";
            updateTotals(oldItem, oldItem);
            return [...oldItems];
          });
        });
    }
  }
  useEffect(() => {
    if (data) {
      const items = data.items.map((d) => {
        return {
          isTopTester: d.isTopTester,
          testerId: `T${d.tester.id}`,
          tester: `${d.tester.name.charAt(0)}. ${d.tester.surname}`,
          completed: d.isCompleted ? ("Payable" as const) : ("No" as const),
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

  if (error && "status" in error) {
    return <ErrorHandler error={error} />;
  }

  if (!payouts || !data) {
    return (
      <MessageWrapper>There was an error loading campaign data</MessageWrapper>
    );
  }

  const isDone = data.items.some((p) => p.status === "done");

  return (
    <>
      <InfoDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        campaign={id}
      />
      <ActionBar>
        <Button
          size="sm"
          type="primary"
          flat
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Info
        </Button>
        <Button
          size="sm"
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
                completed: i.completed === "Payable",
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
                .catch((e) => {
                  alert(e.message);
                })
                .finally(() => {
                  setIsPaying(false);
                });
            }
          }}
          disabled={isPaying || isDone || !canPay}
        >
          {isPaying ? "Paying..." : "Pay Testers"}
        </Button>
      </ActionBar>
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
              completed: row.completed === "Payable" ? true : false,
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
        onChange={(changes) => {
          if (isDone) return false;
        }}
        columns={[
          {
            name: "TID",
            key: "testerId",
            type: "uneditable",
          },
          { name: "Name", key: "tester", width: 150, type: "uneditable" },
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
            name: "Result",
            key: "completed",
            type: isDone ? "uneditable" : "select",
            width: 100,
            values: ["Payable", "No"],
            onChange: (row, newValue) => {
              if (newValue === "Payable") {
                setToPaymentStatus([row], true);
              } else {
                setToPaymentStatus([row], false);
              }
            },
            children: (
              <OpenableColumnButton
                isOpen={expanded.usecases}
                onClick={() =>
                  setExpanded({
                    ...expanded,
                    usecases: !expanded.usecases,
                  })
                }
              >
                Result
              </OpenableColumnButton>
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
            name: "Found Bugs",
            key: "totalBugs",
            width: 110,
            type: "uneditable",
            renderer: bugRenderer,
            children: (
              <ColoredCell color="orange200">
                <OpenableColumnButton
                  isOpen={expanded.bugs}
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      bugs: !expanded.bugs,
                    })
                  }
                >
                  Found Bugs
                </OpenableColumnButton>
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
            name: "Total Pay",
            key: "totalPayout",
            width: 110,
            type: "uneditable",
            renderer: euroRenderer,
            children: (
              <ColoredCell color="green200">
                <OpenableColumnButton
                  isOpen={expanded.payout}
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      payout: !expanded.payout,
                    })
                  }
                >
                  Paga Totale
                </OpenableColumnButton>
              </ColoredCell>
            ),
          },
          ...(expanded.payout
            ? [
                {
                  name: "Test",
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  key: "completionPayout" as const,
                  renderer: euroRenderer,
                  children: <ColoredCell color="green100">Test</ColoredCell>,
                },
                {
                  name: "Bonus Bug",
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  width: 90,
                  key: "bugPayout" as const,
                  renderer: euroRenderer,
                  children: (
                    <ColoredCell color="green100">Bonus Bug</ColoredCell>
                  ),
                },
                {
                  name: "Refund",
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  key: "refundPayout" as const,
                  renderer: euroRenderer,
                  children: <ColoredCell color="green100">Refund</ColoredCell>,
                },
                {
                  name: "Extra",
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  key: "extraPayout" as const,
                  renderer: euroRenderer,
                  children: <ColoredCell color="green100">Extra</ColoredCell>,
                },
              ]
            : []),
          {
            name: "Total XP",
            key: "totalExperience",
            type: "uneditable",
            width: 90,
            renderer: pointsRenderer,
            children: (
              <ColoredCell color="blue200">
                <OpenableColumnButton
                  isOpen={expanded.experience}
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      experience: !expanded.experience,
                    })
                  }
                >
                  Total XP
                </OpenableColumnButton>
              </ColoredCell>
            ),
          },
          ...(expanded.experience
            ? [
                {
                  name: "Base XP",
                  width: 90,
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  renderer: pointsRenderer,
                  key: "completionExperience" as const,
                  children: <ColoredCell color="blue100">XP Base</ColoredCell>,
                },
                {
                  name: "Extra XP",
                  width: 90,
                  renderer: pointsRenderer,
                  type: isDone ? ("uneditable" as const) : ("number" as const),
                  key: "extraExperience" as const,
                  children: <ColoredCell color="blue100">Extra</ColoredCell>,
                },
              ]
            : []),
          {
            name: "Note",
            type: isDone ? "uneditable" : "text",
            key: "notes",
            width: 200,
          },
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
        contextMenu={
          isDone
            ? undefined
            : [
                {
                  label: "Set as payable",
                  handler: (items) => {
                    setToPaymentStatus(items, true);
                  },
                },
                {
                  label: "Set as not payable",
                  handler: (items) => {
                    setToPaymentStatus(items, false);
                  },
                },
              ]
        }
        stickyLeftColumns={3}
      />
    </>
  );
};

export default Table;
