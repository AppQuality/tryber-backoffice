import { TableType } from "@appquality/appquality-design-system";

const Columns = (): TableType.Column[] => {
  return [
    {
      title: "Form Id",
      dataIndex: "id",
      key: "id",
      hideIndex: true,
      maxWidth: "8em",
    },
    {
      title: "Form Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Campaign Id",
      dataIndex: "campaignId",
      key: "campaignId",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "right",
      maxWidth: "4em",
      hideIndex: true,
      role: "cta",
    },
  ];
};
export default Columns;
