import { TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { Ban, CheckCircle } from "src/components/icons";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
import { useAppDispatch, useAppSelector } from "src/store";
import { styled } from "styled-components";
import { setTableColumns } from "../selectionSlice";
import useItems from "../useItems";
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: right;
`;

const StatusIcon = ({ status }: { status?: string }) => {
  if (status === "excluded") return <Ban title="Disqualified" size={16} />;
  if (status === "candidate")
    return <CheckCircle title="Qualified" size={16} />;
  return null;
};

const useTableRows = (id: string) => {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<RowType[]>([]);
  const { showExcluded } = useAppSelector((state) => state.selection);

  const { data, isFetching, isLoading, error, totalRows } = useItems(id);
  useEffect(() => {
    if (data?.results) {
      const newColumns: TableType.Column[] = [];
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
                <CheckboxContainer>
                  {showExcluded ? <StatusIcon status={user.status} /> : null}
                  <DeviceCheckbox
                    campaignId={id}
                    userId={user.id.toString()}
                    deviceId={device.id.toString()}
                  />
                </CheckboxContainer>
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
              id: `T${user.id}`,
              name: `${user.name} ${user.surname}`,
              age: user.age,
              gender: user.gender,
              bhlevel: user.levels.bugHunting,
              exppoints: user.experience,
              metallevel: user.levels.metal,
              totalCpBusiness: user.businessCps,
              lastCpBusiness: user.businessCpsLastMonth,
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
    totalRows,
    isFetching,
    isLoading,
    error,
  };
};

export default useTableRows;
