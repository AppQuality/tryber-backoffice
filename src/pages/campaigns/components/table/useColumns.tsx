import { TableType, icons } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "./FilterContext";

const Eye = icons.EyeFill;
const Bug = icons.BugFill;

const useColumns = (): TableType.Column[] => {
  const { setOrder } = useFiltersCardContext();
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      isSortable: true,
      onSort: (newSort) => setOrder("id", newSort),
    },
    {
      title: "CSM",
      dataIndex: "csm",
      key: "csm",
    },
    {
      title: "Start",
      dataIndex: "start_date",
      key: "startDate",
      isSortable: true,
      onSort: (newSort) => setOrder("startDate", newSort),
    },
    {
      title: "End",
      dataIndex: "end_date",
      key: "endDate",
      isSortable: true,
      onSort: (newSort) => setOrder("endDate", newSort),
    },
    {
      title: "Tester Title",
      dataIndex: "title_tester",
      key: "title_tester",
      maxWidth: "35ch",
    },
    {
      title: "Customer Title",
      dataIndex: "title_customer",
      key: "title_customer",
      maxWidth: "35ch",
    },
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
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
      maxWidth: "18ch",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: <Bug />,
      dataIndex: "result_type",
      key: "result_type",
    },
    {
      title: <Eye />,
      dataIndex: "visible_to",
      key: "visible_to",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      maxWidth: "18ch",
    },
  ];
};
export default useColumns;
