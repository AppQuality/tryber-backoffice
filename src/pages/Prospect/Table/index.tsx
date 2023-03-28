import EdiTable from "../EdiTable";
import { useEffect, useState } from "react";
import { useGetCampaignsByCampaignPayoutsQuery } from "src/services/tryberApi";
import { Button, aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { MessageWrapper } from "./MessageWrapper";
import { Row } from "../types";
import ErrorHandler from "./ErrorHandler";
import ActionBar from "./ActionBar";
import InfoDrawer from "./InfoDrawer";
import useCanPay from "./useCanPay";
import usePayTesters from "./usePayTesters";
import useProspectItems from "./useProspectItems";
import useColumns from "./useColumns";

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
  const { items, isLoading, error, isDone, updateTester } =
    useProspectItems(id);
  const { columns } = useColumns({ isDone });
  const { data, isLoading: isLoadingPayouts } =
    useGetCampaignsByCampaignPayoutsQuery({
      campaign: id,
    });
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

  function setToPaymentStatus(rows: Row[], success: boolean) {
    if (!data) return;
    const payoutData = success
      ? {
          payout: data.testSuccess.payout,
          experience: data.testSuccess.points,
          note: data.testSuccess.message,
        }
      : {
          payout: data.testFailure.payout,
          experience: data.testFailure.points,
          note: data.testFailure.message,
        };
    for (const row of rows) {
      updateTester({
        ...row,
        completed: success ? ("Payable" as const) : ("No" as const),
        completionPayout: payoutData.payout,
        completionExperience: payoutData.experience,
        notes: payoutData.note,
      });
    }
  }

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

  if (!data || !items) {
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
          disabled={isPaying || isDone || !canPay}
        >
          {isPaying ? "Paying..." : "Pay Testers"}
        </Button>
      </ActionBar>
      <MyEdiTable
        onRowChange={(row) => {
          updateTester(row);
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
