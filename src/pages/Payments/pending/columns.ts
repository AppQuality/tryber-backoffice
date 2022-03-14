import { TableType } from "@appquality/appquality-design-system";
import { updateSortingOptions } from "src/redux/adminPayments/actionCreator";
import { Dispatch, SetStateAction } from "react";

export const getColumns = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  dispatch: AppDispatch
): TableType.Column[] => {
  return [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      maxWidth: "max-content",
      hideIndex: true,
    },
    {
      title: "Wait",
      dataIndex: "created",
      key: "created",
      isSortable: "reverse",
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "created", "pending")).then(
          () => setIsLoading(false)
        );
      },
    },

    {
      title: "Who",
      dataIndex: "name",
      key: "name",
      role: "title",
    },
    {
      title: "Id",
      dataIndex: "tryberId",
      key: "tryberId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      role: "cta",
      align: "right",
    },
    {
      title: "Request Id",
      dataIndex: "reqId",
      key: "reqId",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      maxWidth: "max-content",
      role: "overline",
    },
  ];
};
