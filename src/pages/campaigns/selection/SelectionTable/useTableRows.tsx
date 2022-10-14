import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { TableType } from "@appquality/appquality-design-system";

interface RowType extends TableType.Row {
  key: string;
  os: string;
  devices: string;
  nameId?: string;
  exp?: string;
  level?: string;
}
const useTableRows = (id: string) => {
  const { data, isFetching, error } = useGetCampaignsByCampaignCandidatesQuery({
    campaign: id,
  });
  const rows: RowType[] = [];
  if (data && data.results) {
    data.results.forEach((user) =>
      user.devices.forEach((device, index) => {
        let row: RowType = {
          key: `${user.id.toString()}_${index}`,
          os: `${device.os} ${device.osVersion}`,
          devices: device.manufacturer
            ? `${device.manufacturer} ${device.model}`
            : "-",
        };
        if (index === 0) {
          row = {
            ...row,
            nameId: `${user.name} ${user.surname} T${user.id}`,
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
    isFetching,
    error,
  };
};

export default useTableRows;
