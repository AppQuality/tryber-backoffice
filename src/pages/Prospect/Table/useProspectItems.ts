import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import { SetStateAction, useEffect, useState } from "react";
import {
  useGetCampaignsByCampaignPayoutsQuery,
  useGetCampaignsByCampaignProspectQuery,
  usePutCampaignsByCampaignProspectAndTesterIdMutation,
} from "src/services/tryberApi";
import { CellStyle } from "../EdiTable/types";
import { Row } from "../types";

const useProspectItems = ({
  id,
  testerFilter,
  selectionMode,
}: {
  id: string;
  testerFilter?: number[];
  selectionMode?: "include" | "exclude";
}) => {
  const [items, setItems] = useState<(Row & CellStyle)[]>([]);
  const { data: payouts, isLoading: isLoadingPayouts } =
    useGetCampaignsByCampaignPayoutsQuery({
      campaign: id,
    });
  const [updateTester] = usePutCampaignsByCampaignProspectAndTesterIdMutation();

  const { data, isLoading, error } = useGetCampaignsByCampaignProspectQuery({
    campaign: id,
    ...(testerFilter && selectionMode === "include"
      ? { filterByInclude: { ids: testerFilter.join(",") } }
      : {}),
    ...(testerFilter && selectionMode === "exclude"
      ? { filterByExclude: { ids: testerFilter.join(",") } }
      : {}),
  });

  useEffect(() => {
    if (data) {
      let items: SetStateAction<(Row & CellStyle)[]> = [];
      if (error && "status" in error && error.status === 404) {
        items = [];
      } else {
        items = data.items.map((d) => {
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
            totalPayout: `${(
              d.payout.completion +
              d.payout.bug +
              d.payout.refund +
              d.payout.extra
            ).toFixed(2)}`,
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
      }
      setItems(items);
    }
  }, [data, error]);

  return {
    items,
    isLoading,
    isLoadingPayouts,
    error,
    setItems,
    isDone: data ? data.items.some((p) => p.status === "done") : true,
    updateTester: (row: Row, oldRow?: Row) => {
      if (payouts && oldRow && oldRow.completed !== row.completed) {
        const payoutData =
          row.completed === "Payable"
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
        row = {
          ...row,
          completed:
            row.completed === "Payable"
              ? ("Payable" as const)
              : ("No" as const),
          completionPayout: payoutData.payout,
          completionExperience: payoutData.experience,
          notes: payoutData.note,
        };
      }
      updateTester({
        campaign: id,
        testerId: row.testerId.replace("T", ""),
        body: {
          payout: {
            completion: row.completionPayout,
            bugs: Math.min(row.bugPayout, payouts?.maxBonusBug ?? 0),
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
            if (payouts && row.bugPayout > payouts.maxBonusBug) {
              row.bugPayout = payouts.maxBonusBug;
            }
            const index = oldItems.findIndex(
              (i) => i.testerId === row.testerId
            );
            const oldItem = oldItems[index];
            oldItem.completionPayout = row.completionPayout;
            oldItem.completionExperience = row.completionExperience;
            oldItem.notes = row.notes;
            oldItem.completed = row.completed;
            return [...oldItems];
          });
        });
    },
  };
};

export default useProspectItems;
