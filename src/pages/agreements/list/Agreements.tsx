import {
  Button,
  Pagination,
  Table,
} from "@appquality/appquality-design-system";
import { ReactComponent as EditIcon } from "src/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  useDeleteAgreementsByAgreementIdMutation,
  useGetAgreementsQuery,
} from "src/services/tryberApi";
import styled from "styled-components";
import { useFiltersAgreementsContext } from "./FilterContext";

const TableContainer = styled.div`
  background-color: white;
  padding: 1rem;
`;

export const Agreements = () => {
  const LIMIT = 10;
  const [deleteAgreement] = useDeleteAgreementsByAgreementIdMutation();
  const { add } = siteWideMessageStore();
  const { filters, page, setPage } = useFiltersAgreementsContext();
  const { data, refetch } = useGetAgreementsQuery({
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
      title: "Amount",
      dataIndex: "value",
      key: "value",
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

  const onDelete = async (id: string, title: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this agreement? ID: ${id}, Title: ${title}`
      ) === true
    ) {
      deleteAgreement({ agreementId: id })
        .unwrap()
        .then((res) => {
          refetch();
          add({ type: "success", message: "Agreement Deleted" });
        })
        .catch((err) => {
          refetch();
          add({
            type: "danger",
            message: "There was an error",
          });
        });
    }
  };

  return (
    <TableContainer data-qa="agreements-table">
      <Table
        columns={columns}
        dataSource={
          data
            ? data?.items.map((a) => ({
                key: a.id,
                id: a.id,
                title: a.title,
                tokens: a.tokens,
                value: `${(a.unitPrice * a.tokens)
                  .toFixed(2)
                  .replace(/\.00$/, "")}€`,
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
                      kind="link"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      data-qa={`delete-agreement-button-${a.id}`}
                      onClick={() => onDelete(a.id.toString(), a.title)}
                      size="sm"
                      kind="link"
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
