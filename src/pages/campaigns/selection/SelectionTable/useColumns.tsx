import { TableType } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import SelectAllFirstDevicesCheckbox from "./components/SelectAllFirstDevicesCheckbox";

export const useColumns: () => TableType.Column[] = () => {
  const { id } = useParams<{ id: string }>();

  return [
    {
      dataIndex: "nameId",
      key: "nameId",
      title: "Name ID",
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
      title: "Experience Points",
    },
    {
      dataIndex: "bhlevel",
      key: "bhlevel",
      title: "BH Level",
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
