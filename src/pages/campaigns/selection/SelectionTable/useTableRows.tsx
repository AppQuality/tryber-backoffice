import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { TableType } from "@appquality/appquality-design-system";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
import { useAppDispatch, useAppSelector } from "src/store";
import { setTableColumns } from "../selectionSlice";
import { columns } from "./columns";
import { useEffect } from "react";

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
  const { currentPage, devicesPerPage, questionsId } = useAppSelector(
    (state) => state.selection
  );
  const { data, isFetching, isLoading, error, refetch } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      start: devicesPerPage * (currentPage - 1),
      limit: devicesPerPage,
      ...(questionsId.length ? { fields: questionsId.join(",") } : {}),
    });
  const rows: RowType[] = [];

  useEffect(() => {
    if (data?.results) {
      console.log(data.results);
      const newColumns = [...columns];
      data.results[0]?.questions?.forEach((q, i) => {
        if (q.title && q.id)
          newColumns.splice(5 + i, 0, {
            dataIndex: q.title,
            key: q.id.toString(),
            title: q.title,
          });
      });
      dispatch(setTableColumns(newColumns));
    }
  }, [data]);

  if (data && data.results) {
    data.results.forEach((user, userIndex) =>
      user.devices.forEach((device, deviceIndex) => {
        let row: RowType = {
          key: `${user.id.toString()}_${deviceIndex}`,
          highlighted: userIndex % 2 === 0,
          os: `${device.os} ${device.osVersion}`.replace(
            "Windows Windows",
            "Windows"
          ),
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
          user.questions?.forEach((a) => {
            if (a.title) {
              fields = { ...fields, ...{ [a.title]: a.value } };
            }
          });
          row = {
            ...row,
            nameId: `T${user.id} ${user.name} ${user.surname}`,
            exp: user.experience.toString(),
            level: user.level,
            ...fields,
          };
        }
        rows.push(row);
      })
    );
  }

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
