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
      maxWidth: "7ch",
      onSort: (newSort) => setOrder("id", newSort),
    },
    {
      title: "Titles",
      dataIndex: "title_customer",
      key: "title_customer",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      maxWidth: "15ch",
    },
    {
      title: <Bug style={{ fontSize: "16px" }} />,
      dataIndex: "result_type",
      key: "result_type",
      maxWidth: "5ch",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      maxWidth: "20ch",
    },
    {
      title: "Peoples",
      dataIndex: "peoples",
      key: "peoples",
      maxWidth: "20ch",
    },
    {
      title: "Start",
      dataIndex: "start_date",
      key: "startDate",
      maxWidth: "12ch",
      isSortable: true,
      onSort: (newSort) => setOrder("startDate", newSort),
    },
    {
      title: "End",
      dataIndex: "end_date",
      key: "endDate",
      maxWidth: "12ch",
      isSortable: true,
      onSort: (newSort) => setOrder("endDate", newSort),
    },
    {
      title: <Eye style={{ fontSize: "16px" }} />,
      dataIndex: "visible_to",
      key: "visible_to",
      maxWidth: "5ch",
    },
    {
      title: "Status",
      dataIndex: "phase",
      key: "phase",
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
