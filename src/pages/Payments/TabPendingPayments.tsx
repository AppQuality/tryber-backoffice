import {
  Button,
  Checkbox,
  Pagination,
  Table,
  TableType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { currencyTable, getWaitingDays } from "src/pages/Payments/utils";
import {
  fetchPaymentRequests,
  selectRequest,
  togglePaymentModal,
  updatePagination,
  updateSortingOptions,
} from "src/redux/adminPayments/actionCreator";
import { useAppDispatch } from "src/redux/provider";
import styled from "styled-components";

import paypalIcon from "./assets/paypal.svg";
import twIcon from "./assets/transferwise.svg";

export const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${(p) => p.theme.grid.sizes[3]} ${(p) => p.theme.grid.sizes[3]};
  .pay-btn {
    min-width: 135px;
  }
`;

export const TabPendingPayments = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pendingRequests } = useSelector(
    (state: GeneralState) => state.adminPayments,
    shallowEqual
  );
  const { items, limit, order, orderBy, total, selected, start } =
    pendingRequests;
  const [rows, setRows] = useState<TableType.Row[]>([]);

  // initial requests
  useEffect(() => {
    dispatch(fetchPaymentRequests("pending")).then(() => setIsLoading(false));
  }, []);

  // update datasource for the table
  useEffect(() => {
    if (typeof items !== "undefined") {
      setRows(
        items.map((req) => ({
          select: {
            title: "select",
            content: (
              <Checkbox
                checked={selected.indexOf(req.id) >= 0}
                onChange={() => dispatch(selectRequest(req.id))}
              />
            ),
          },
          key: req.id,
          created: {
            title: "waiting days",
            content: (
              <div className="aq-text-primary">
                {getWaitingDays(req.created)} days
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
  }, [pendingRequests]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updatePagination(newStart, "pending")).then(() =>
      setIsLoading(false)
    );
  };

  const columns: TableType.Column[] = [
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

  const paySelectedRequests = () => {
    dispatch(togglePaymentModal(true));
  };
  return (
    <>
      <Table
        isStriped
        isLoading={isLoading}
        columns={columns}
        dataSource={rows}
        order={order}
        orderBy={orderBy}
        className="aq-p-3"
      />
      <TableActions>
        <Pagination
          current={start / limit + 1}
          maxPages={Math.ceil(total / limit)}
          onPageChange={changePagination}
        />
        <Button
          onClick={paySelectedRequests}
          type="primary"
          className="pay-btn"
          disabled={selected.length <= 0}
        >
          Pay
        </Button>
      </TableActions>
    </>
  );
};
