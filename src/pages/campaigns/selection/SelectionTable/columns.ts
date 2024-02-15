import { TableType } from "@appquality/appquality-design-system";

export const columns: TableType.Column[] = [
  {
    dataIndex: "testerId",
    key: "testerId",
    title: "Tester ID",
    maxWidth: "100px",
  },
  {
    dataIndex: "name",
    key: "name",
    title: "Name",
    maxWidth: "180px",
  },
  {
    dataIndex: "age",
    key: "age",
    title: "Age",
    maxWidth: "100px",
  },
  {
    dataIndex: "gender",
    key: "gender",
    title: "Gender",
    maxWidth: "100px",
  },
  {
    dataIndex: "level",
    key: "level",
    title: "UX Level",
  },
  {
    dataIndex: "exp",
    key: "exp",
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
    maxWidth: "180px",
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "",
  },
];
