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
      maxWidth: "80px",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      maxWidth: "200px",
    },
    {
      dataIndex: "age",
      key: "age",
      title: "Age",
      maxWidth: "80px",
    },
    {
      dataIndex: "gender",
      key: "gender",
      title: "Gender",
      maxWidth: "120px",
    },
    {
      dataIndex: "bhlevel",
      key: "bhlevel",
      title: "BH Level",
      maxWidth: "120px",
    },
    {
      dataIndex: "metallevel",
      key: "metallevel",
      title: "Metal Level",
      maxWidth: "120px",
    },
    {
      dataIndex: "totalCpBusiness",
      key: "totalCpBusiness",
      title: (
        <span title="Total number of business campaigns in which the user has submitted at list a bug">
          Total CPs
        </span>
      ),
      maxWidth: "80px",
    },
    {
      dataIndex: "lastCpBusiness",
      key: "lastCpBusiness",
      title: (
        <span title="Business campaigns in which the user has been selected in the last month">
          Last 30d CPs
        </span>
      ),
      maxWidth: "110px",
    },
    {
      dataIndex: "exppoints",
      key: "exppoints",
      title: "Exp Points",
      maxWidth: "120px",
    },
    {
      dataIndex: "devices",
      key: "devices",
      title: "Devices",
      maxWidth: "200px",
    },
    {
      dataIndex: "os",
      key: "os",
      title: "OS",
      maxWidth: "200px",
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
