import {
  Checkbox,
  Pagination,
  Table,
  TableType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { TableActions } from "src/pages/Payments/TabPendingPayments";
import { currencyTable, getWaitingDays } from "src/pages/Payments/utils";
import {
  fetchPaymentRequests,
  updatePagination,
  updateSortingOptions,
} from "src/redux/adminPayments/actionCreator";
import { useAppDispatch } from "src/redux/provider";

import paypalIcon from "./assets/paypal.svg";
import twIcon from "./assets/transferwise.svg";

export const TabFailedPayments = () => {
  const dispatch = useAppDispatch();
  const [selectedReqs, setSelectedReqs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { items, limit, order, orderBy, total } = useSelector(
    (state: GeneralState) => state.adminPayments.failedRequests,
    shallowEqual
  );
  const [rows, setRows] = useState<TableType.Row[]>([]);

  // initial requests
  useEffect(() => {
    dispatch(fetchPaymentRequests("failed")).then(() => setIsLoading(false));
  }, []);

  const changeSelectedReqs = (id: number) => {
    if (selectedReqs.indexOf(id) >= 0) {
      setSelectedReqs([]);
    } else {
      setSelectedReqs([id]);
    }
  };
  const getErrorMessage = (err: string): string => {
    try {
      const obj = JSON.parse(err);
      return obj.code as string;
    } catch (e) {
      return err;
    }
  };
  // update datasource for the table
  useEffect(() => {
    if (typeof items !== "undefined") {
      setRows(
        items.map((req) => ({
          select: {
            title: "select",
            content: (
              <Checkbox
                checked={selectedReqs.indexOf(req.id) >= 0}
                onChange={() => changeSelectedReqs(req.id)}
              />
            ),
          },
          key: req.id,
          updated: {
            title: "waiting days",
            content: (
              <div className="aq-text-primary">
                {getWaitingDays(req.updated)} days
              </div>
            ),
          },
          error: {
            title: "type of error",
            content: (
              <div className="aq-text-danger">
                {req.error ? getErrorMessage(req.error) : "Undefined Error"}
              </div>
            ),
          },
          name: `${req.tryber.name} ${req.tryber.surname}`,
          tryberId: "T" + req.tryber.id,
          reqId: req.id,
          amount: {
            title: "amount",
            content: (
              <div className="aq-text-success">
                {req.amount.currency in currencyTable
                  ? currencyTable[req.amount.currency]
                  : req.amount.currency}{" "}
                {req.amount.value.toFixed(2)}
              </div>
            ),
          },
          method: {
            title: req.type,
            content: (
              <img
                src={req.type === "paypal" ? paypalIcon : twIcon}
                alt={req.type}
              />
            ),
          },
        }))
      );
    }
  }, [items, selectedReqs]);

  const changePagination = (newPage: number) => {
    setPage(newPage);
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updatePagination(newStart, "failed")).then(() =>
      setIsLoading(false)
    );
  };

  const columns: TableType.Column[] = [
    {
      title: "Wait",
      dataIndex: "updated",
      key: "updated",
      isSortable: true,
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
  return (
    <>
      <Table
        isStriped
        isLoading={isLoading}
        columns={columns}
        dataSource={rows}
        className="aq-p-3"
        order={order}
        orderBy={orderBy}
      />
      <TableActions>
        <Pagination
          current={page}
          maxPages={Math.ceil(total / limit)}
          onPageChange={changePagination}
        />
      </TableActions>
    </>
  );
};
