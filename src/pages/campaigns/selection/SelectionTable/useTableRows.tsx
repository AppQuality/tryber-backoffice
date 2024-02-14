import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { TableType } from "@appquality/appquality-design-system";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
import { useAppDispatch, useAppSelector } from "src/store";
import { setTableColumns } from "../selectionSlice";
import { columns } from "./columns";
import { useEffect, useState } from "react";

interface RowType extends TableType.Row {
  key: string;
  os: string;
  devices: string;
  actions: { title: string; content: JSX.Element };
  nameId?: string;
  exp?: string;
  level?: string;
  [key: string]: any;
}

const useTableRows = (id: string) => {
  const dispatch = useAppDispatch();
  const { currentPage, devicesPerPage, questionsId, filters } = useAppSelector(
    (state) => state.selection
  );
  const _questionsId = ["question_524", "question_525"];
  const [rows, setRows] = useState<RowType[]>([]);
  const { filterByInclude, filterByExclude } = filters;
  const { data, isFetching, isLoading, error, refetch } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      start: devicesPerPage * (currentPage - 1),
      limit: devicesPerPage,
      ...(_questionsId.length ? { fields: _questionsId.join(",") } : {}),
      filterByInclude,
      filterByExclude,
    });

  useEffect(() => {
    if (data?.results) {
      const newColumns = [...columns];
      data.results[0]?.questions?.forEach((q, i) => {
        if (q.title && q.id)
          newColumns.splice(1 + i, 0, {
            dataIndex: `${q.id}-${i}`,
            key: `${q.id}-${i}`,
            title: q.title,
          });
      });
      dispatch(setTableColumns(newColumns));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const newRows: RowType[] = [];
    if (data && data.results) {
      data.results.forEach((user, userIndex) =>
        user.devices.forEach((device, deviceIndex) => {
          let row: RowType = {
            key: `${user.id.toString()}_${deviceIndex}`,
            highlighted: userIndex % 2 === 0,
            os: `${device.os} ${device.osVersion}`
              .replace("Windows Windows", "Windows")
              .replace("iOS iOS", "iOS")
              .replace("MacOS Mac OS", "Mac OS"),
            devices: device.manufacturer
              ? `${device.manufacturer} ${device.model}`
              : "-",
            actions: {
              title: "select",
              content: (
                <DeviceCheckbox
                  userId={user.id.toString()}
                  deviceId={device.id.toString()}
                />
              ),
            },
          };
          if (deviceIndex === 0) {
            let fields: { [key: string]: any } = {};
            user.questions?.forEach((q, i) => {
              fields = { ...fields, ...{ [`${q.id}-${i}`]: q.value || "-" } };
            });
            row = {
              ...row,
              nameId: `T${user.id} ${user.name} ${user.surname}`,
              exp:
                user.experience < 1000
                  ? "Rookie"
                  : user.experience < 3000
                  ? "Advanced"
                  : user.experience < 5000
                  ? "Expert"
                  : user.experience < 20000
                  ? "Champion"
                  : "Veteran",
              level: user.level,
              ...fields,
            };
          }
          newRows.push(row);
        })
      );
    }
    setRows(newRows);
  }, [data]);

  return {
    rows,
    totalRows: data?.total || 0,
    isFetching,
    refetch,
    isLoading,
    error,
  };
};

export default useTableRows;
