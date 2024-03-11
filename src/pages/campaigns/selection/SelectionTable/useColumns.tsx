import { TableType } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import SelectAllFirstDevicesCheckbox from "./components/SelectAllFirstDevicesCheckbox";

export const useColumns: () => TableType.Column[] = () => {
  const { id } = useParams<{ id: string }>();

  return [
    {
      dataIndex: "id",
      key: "id",
      title: "ID",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "age",
      key: "age",
      title: "Age",
    },
    {
      dataIndex: "gender",
      key: "gender",
      title: "Gender",
    },
    {
      dataIndex: "metallevel",
      key: "metallevel",
      title: "Metal Level",
    },
    {
      dataIndex: "exppoints",
      key: "exppoints",
      title: "Exp Points",
    },
    {
      dataIndex: "bhlevel",
      key: "bhlevel",
      title: "BH Level",
    },
    {
      dataIndex: "totalCpBusiness",
      key: "totalCpBusiness",
      title: (
        <span title="Total number of business campaigns in which the user has submitted at list a bug">
          Total CP
        </span>
      ),
    },
    {
      dataIndex: "lastCpBusiness",
      key: "lastCpBusiness",
      title: (
        <span title="Business campaigns in which the user has been selected in the last month">
          Last CP
        </span>
      ),
    },
    {
      dataIndex: "devices",
      key: "devices",
      title: "Devices",
    },
    {
      dataIndex: "os",
      key: "os",
      title: "OS",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: (
        <SelectAllFirstDevicesCheckbox
          data-testid="selectAllFirstDevices"
          campaignId={id}
        />
      ),
    },
  ];
};
