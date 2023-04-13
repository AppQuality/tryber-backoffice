import { Button, aqBootstrapTheme } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import styled from "styled-components";
import EdiTable from "../EdiTable";
import { Row } from "../types";
import ActionBar from "./ActionBar";
import ErrorHandler from "./ErrorHandler";
import InfoDrawer from "./InfoDrawer";
import { MessageWrapper } from "./MessageWrapper";
import PayTesterButton from "./PayTesterButton";
import SearchBar from "./SearchBar";
import StatusSelector from "./StatusSelector";
import useCanPay from "./useCanPay";
import useColumns from "./useColumns";
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
  const canPay = useCanPay(id);

  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    if (items) {
      for (const item of items) {
        item.totalPayout = `${(
          item.completionPayout +
          item.bugPayout +
          item.refundPayout +
          item.extraPayout
        ).toFixed(2)}`;
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
      totalPayout: Number(
        items.reduce((acc, i) => acc + Number(i.totalPayout), 0).toFixed(2)
      ),
      completionPayout: Number(
        items.reduce((acc, i) => acc + Number(i.completionPayout), 0).toFixed(2)
      ),
      bugPayout: Number(
        items.reduce((acc, i) => acc + Number(i.bugPayout), 0).toFixed(2)
      ),
      refundPayout: Number(
        items.reduce((acc, i) => acc + Number(i.refundPayout), 0).toFixed(2)
      ),
      extraPayout: Number(
        items.reduce((acc, i) => acc + Number(i.extraPayout), 0).toFixed(2)
      ),
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
          type="info"
          flat
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Info Rules
        </Button>
        <div style={{ display: "flex" }}>
          <StatusSelector id={id} disabled={isDone} />
          <PayTesterButton
            id={id}
            disabled={isDone || !canPay || selectedTesters.length > 0}
            testers={items
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
              .filter((i) => i.tester.id > 0)}
          />
        </div>
      </ActionBar>
      <SearchBar
        className="aq-my-1"
        onClick={(v, mode) => {
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
