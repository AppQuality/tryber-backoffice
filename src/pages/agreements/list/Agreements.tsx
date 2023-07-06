import {
  Button,
  Pagination,
  Table,
} from "@appquality/appquality-design-system";
import { useGetAgreementsQuery } from "src/services/tryberApi";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "src/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import { useFiltersAgreementsContext } from "./FilterContext";

const TableContainer = styled.div`
  background-color: white;
  padding: 1rem;
`;

export const Agreements = () => {
  const LIMIT = 10;

  const { filters, page, setPage } = useFiltersAgreementsContext();
  const { data, isLoading, isError } = useGetAgreementsQuery({
    ...(filters.customers && {
      filterBy: { customer: filters.customers?.map((c) => c.id).join() },
    }),
    limit: LIMIT,
    start: (page - 1) * LIMIT,
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tokens",
      dataIndex: "tokens",
      key: "tokens",
    },
    {
      title: "Unit price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Expiration date",
      dataIndex: "expirationDate",
      key: "expirationDate",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Is token based",
      dataIndex: "isTokenBased",
      key: "isTokenBased",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <TableContainer>
      <Table
        columns={columns}
        dataSource={
          data
            ? data?.items.map((a) => ({
                key: a.id,
                id: a.id,
                title: a.title,
                tokens: a.tokens,
                unitPrice: a.unitPrice,
                startDate: a.startDate,
                expirationDate: a.expirationDate,
                customer: a.customer.company,
                note: a.note,
                isTokenBased: a.isTokenBased ? "Yes" : "No",
                actions: (
                  <div title="Actions">
                    <Button
                      // TODO: add useNavigate
                      onClick={() =>
                        (window.location.href = `/backoffice/agreements/${a.id}`)
                      }
                      size="sm"
                      type="link"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      // TODO: add delete mutation
                      onClick={() =>
                        (window.location.href = `/backoffice/agreements/${a.id}/delete`)
                      }
                      size="sm"
                      type="link"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                ),
              }))
            : []
        }
      />
      {data && data.total && data.limit ? (
        <Pagination
          onPageChange={(newPage) => setPage(newPage)}
          current={page}
          maxPages={Math.ceil(data.total / data.limit)}
        />
      ) : null}
    </TableContainer>
  );
};
