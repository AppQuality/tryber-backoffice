import { TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
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

const useTableRows = (id: string) => {
  const [rows, setRows] = useState<RowType[]>([]);

  const { data, isFetching, isLoading, error, totalRows } = useItems(id);

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
                  campaignId={id}
                  userId={user.id.toString()}
                  deviceId={device.id.toString()}
                />
              ),
            },
          };
          if (deviceIndex === 0) {
            let fields: { [key: string]: any } = {};
            user.questions?.forEach((q, i) => {
              fields = {
                ...fields,
                ...{ [`question_${q.id}`]: q.value || "-" },
              };
            });
            row = {
              ...row,
              nameId: `T${user.id} ${user.name} ${user.surname}`,
              age: user.age,
              gender: user.gender,
              bhlevel: user.levels.bugHunting,
              exppoints: user.experience,
              metallevel: user.levels.metal,
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
