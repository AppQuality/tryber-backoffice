import { TableType } from "@appquality/appquality-design-system";
import { updateSortingOptions } from "src/redux/adminPayments/actionCreator";
import { Dispatch, SetStateAction } from "react";

export const getColumns = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  dispatch: AppDispatch
): TableType.Column[] => {
  return [
    {
      title: "Wait",
      dataIndex: "updated",
      key: "updated",
      isSortable: "reverse",
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "updated", "failed")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: "Who",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Reason",
      dataIndex: "error",
      key: "error",
    },
    {
      title: "id",
      dataIndex: "tryberId",
      key: "tryberId",
    },
    {
      title: "Request Id",
      dataIndex: "reqId",
      key: "reqId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
  ];
};
