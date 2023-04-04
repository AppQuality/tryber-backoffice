import { Button, aqBootstrapTheme } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import styled from "styled-components";
import EdiTable from "../EdiTable";
import { Row } from "../types";
import ActionBar from "./ActionBar";
import ErrorHandler from "./ErrorHandler";
import InfoDrawer from "./InfoDrawer";
import { MessageWrapper } from "./MessageWrapper";
import SearchBar from "./SearchBar";
import useCanPay from "./useCanPay";
import useColumns from "./useColumns";
import usePayTesters from "./usePayTesters";
import useProspectItems from "./useProspectItems";

const EdiTableWithType = EdiTable<Row>;

const MyEdiTable = styled(EdiTableWithType)`
  .subheader {
    background-color: ${({ theme }) => theme.colors.purple100} !important;
  }
  .rg-customHeader-cell {
    background-color: ${({ theme }) => theme.colors.white} !important;
  }
`;

const Table = ({
  id,
  containerWidth,
}: {
  id: string;
  containerWidth: number;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTesters, setSelectedTesters] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState<"include" | "exclude">(
    "include"
  );
  const { items, isLoading, error, isDone, updateTester } = useProspectItems({
    id,
    testerFilter: selectedTesters,
    selectionMode,
  });
  const { columns } = useColumns({ isDone });
  const { isPaying, payTesters } = usePayTesters(id);
  const canPay = useCanPay(id);

  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    if (items) {
      for (const item of items) {
        item.totalPayout = `${
          item.completionPayout +
          item.bugPayout +
          item.refundPayout +
          item.extraPayout
        }`;
        item.totalExperience = `${
          item.completionExperience + item.extraExperience
        }`;

        item.style =
          item.completed === "Payable"
            ? {}
            : {
                backgroundColor: aqBootstrapTheme.colors.red100,
                borderColor: aqBootstrapTheme.colors.red200,
                color: aqBootstrapTheme.colors.red800,
              };
      }
    }
  }, [items]);

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
    return <MessageWrapper>Loading...</MessageWrapper>;
  }

  if (error && "status" in error && error.status !== 404) {
    return <ErrorHandler error={error} />;
  }

  if (!items) {
    return (
      <MessageWrapper>There was an error loading campaign data</MessageWrapper>
    );
  }

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
              payTesters(testerToPay);
            }
          }}
          disabled={isPaying || isDone || !canPay || selectedTesters.length > 0}
        >
          {isPaying ? "Paying..." : "Pay Testers"}
        </Button>
      </ActionBar>
      <SearchBar
        className="aq-my-1"
        onChange={(v, mode) => {
          const list = v
            .split(",")
            .map((i) => Number(i.replace(/\D/g, "")))
            .filter((i) => i > 0);
          setSelectedTesters(list);
          mode && setSelectionMode(mode);
        }}
      />
      {
        <MyEdiTable
          onRowChange={(row, oldRow) => {
            updateTester(row, oldRow);
          }}
          onChange={(changes) => {
            if (isDone) return false;
          }}
          columns={columns}
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
                      for (const row of items) {
                        updateTester(
                          {
                            ...row,
                            completed: "Payable" as const,
                          },
                          row
                        );
                      }
                    },
                  },
                  {
                    label: "Set as not payable",
                    handler: (items) => {
                      for (const row of items) {
                        updateTester(
                          {
                            ...row,
                            completed: "No" as const,
                          },
                          row
                        );
                      }
                    },
                  },
                ]
          }
          stickyLeftColumns={3}
        />
      }
    </>
  );
};

export default Table;
