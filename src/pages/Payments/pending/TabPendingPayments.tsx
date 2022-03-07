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
} from "src/redux/adminPayments/actionCreator";
import { useAppDispatch } from "src/redux/provider";
import styled from "styled-components";

import paypalIcon from "src/pages/Payments/assets/paypal.svg";
import twIcon from "src/pages/Payments/assets/transferwise.svg";
import { getColumns } from "src/pages/Payments/pending/columns";

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
  const columns = getColumns(setIsLoading, dispatch);

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
