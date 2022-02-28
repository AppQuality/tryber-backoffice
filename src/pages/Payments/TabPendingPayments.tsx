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
  const [page, setPage] = useState<number>(1);
  const {
    pendingRequests: { items, limit, order, orderBy, total, selected },
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  // initial requests
  useEffect(() => {
    dispatch(fetchPaymentRequests("pending")).then(() => setIsLoading(false));
  }, []);

  const changeSelectedReqs = (id: number) => {
    if (selected.indexOf(id) >= 0) {
      dispatch(selectRequest([]));
    } else {
      dispatch(selectRequest([id]));
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
                checked={selected.indexOf(req.id) >= 0}
                onChange={() => changeSelectedReqs(req.id)}
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
                {req.amount.value}
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
  }, [items, selected]);

  const changePagination = (newPage: number) => {
    setPage(newPage);
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
      isSortable: true,
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
          current={page}
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
