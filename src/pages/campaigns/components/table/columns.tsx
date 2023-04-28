import { TableType } from "@appquality/appquality-design-system";

const columns: TableType.Column[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "CSM",
    dataIndex: "csm",
    key: "csm",
  },
  {
    title: "Start",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "End",
    dataIndex: "end_date",
    key: "end_date",
  },
  {
    title: "Tester Title",
    dataIndex: "title_tester",
    key: "title_tester",
    maxWidth: "30ch",
  },
  {
    title: "Customer Title",
    dataIndex: "title_customer",
    key: "title_customer",
    maxWidth: "30ch",
  },
  {
    title: "Project",
    dataIndex: "project_name",
    key: "project_name",
  },
  {
    title: "Result",
    dataIndex: "result_type",
    key: "result_type",
  },
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Visible to",
    dataIndex: "visible_to",
    key: "visible_to",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];
export default columns;
