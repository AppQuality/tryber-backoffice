import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { TableType } from "@appquality/appquality-design-system";
import DeviceCheckbox from "src/pages/campaigns/selection/SelectionTable/components/DeviceCheckbox";
import { useAppSelector } from "src/store";

interface RowType extends TableType.Row {
  key: string;
  os: string;
  devices: string;
  actions: { title: string; content: JSX.Element };
  nameId?: string;
  exp?: string;
  level?: string;
}

const useTableRows = (id: string) => {
  const { currentPage, devicesPerPage } = useAppSelector(
    (state) => state.selection
  );
  const { data, isFetching, isLoading, error, refetch } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      start: devicesPerPage * (currentPage - 1),
      limit: devicesPerPage,
    });
  const rows: RowType[] = [];
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
          row = {
            ...row,
            nameId: `T${user.id} ${user.name} ${user.surname}`,
            exp: user.experience.toString(),
            level: user.level,
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
