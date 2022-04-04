import {
  Button,
  Checkbox,
  Pagination,
  Table,
  TableType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { TableActions } from "src/pages/Payments/pending/TabPendingPayments";
import { currencyTable, getWaitingDays } from "src/pages/Payments/utils";
import {
  fetchPaymentRequests,
  toggleRetryModal,
  updatePagination,
} from "src/redux/adminPayments/actionCreator";
import { useAppDispatch } from "src/redux/provider";
import paypalIcon from "src/pages/Payments/assets/paypal.svg";
import twIcon from "src/pages/Payments/assets/transferwise.svg";
import { getColumns } from "src/pages/Payments/failed/columns";
import styled from "styled-components";

const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 7em;

  ${Button} {
    padding: 0;
    color: ${(props) => props.theme.palette.primary};

    &:hover {
      color: ${(props) => props.theme.palette.secondary};
    }
  }

  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    flex-direction: column;
    align-items: flex-end;

    ${Button} {
      padding-bottom: 1em;
    }
  }
`;

export const TabFailedPayments = () => {
  const dispatch = useAppDispatch();
  const [selectedReqs, setSelectedReqs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { items, limit, order, orderBy, total, start } = useSelector(
    (state: GeneralState) => state.adminPayments.failedRequests,
    shallowEqual
  );
  const [rows, setRows] = useState<TableType.Row[]>([]);
  const columns = getColumns(setIsLoading, dispatch);
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
          actions: {
            title: "retry",
            content: (
              <StyledActions>
                <Button type="link" onClick={() => null}>
                  Delete
                </Button>
                <Button
                  type="link"
                  onClick={() => dispatch(toggleRetryModal(true, req.id))}
                >
                  Retry
                </Button>
              </StyledActions>
            ),
          },
        }))
      );
    }
  }, [items, selectedReqs]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updatePagination(newStart, "failed")).then(() =>
      setIsLoading(false)
    );
  };

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
          current={start / limit + 1}
          maxPages={Math.ceil(total / limit)}
          onPageChange={changePagination}
        />
      </TableActions>
    </>
  );
};
