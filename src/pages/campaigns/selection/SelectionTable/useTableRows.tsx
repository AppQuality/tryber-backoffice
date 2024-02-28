import { TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { setTableColumns } from "../selectionSlice";
import { columns } from "./columns";

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
  const [rows, setRows] = useState<RowType[]>([]);
  const { filterByInclude, filterByExclude } = filters;
  const { data, isFetching, isLoading, error } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      start: devicesPerPage * (currentPage - 1),
      limit: devicesPerPage,
      ...(questionsId.length ? { fields: questionsId.join(",") } : {}),
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
              age: user.age,
              gender: user.gender,
              bhlevel: user.levels.bugHunting,
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
    isLoading,
    error,
  };
};

export default useTableRows;
