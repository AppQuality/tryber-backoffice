import { PageTitle, Table } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import getAllAgreements from "src/api/getAllAgreements";

interface Agreement {
  id: number;
  title: string;
  tokens: number;
  unitPrice: number;
  startDate: string;
  expirationDate: string;
  customer: {
    id: number;
    company: string;
  };
  note: string;
  isTokenBased: boolean;
}

const AgreementsListPage = () => {
  const [agreements, setAgreements] = useState<
    (Agreement & { key: string }[]) | []
  >([]);
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
  ];

  useEffect(() => {
    getAllAgreements()
      .then(({ items }) => {
        console.log(items);
        setAgreements(
          items.map((r: Agreement) => ({
            id: r.id,
            title: r.title,
            tokens: r.tokens,
            unitPrice: r.unitPrice,
            startDate: r.startDate,
            expirationDate: r.expirationDate,
            customer: r.customer.company,
            note: r.note,
            isTokenBased: r.isTokenBased ? "Yes" : "No",
            key: r.id,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <PageTitle size="regular">Agreements List</PageTitle>
      <Table columns={columns} dataSource={agreements} />
    </>
  );
};

export default AgreementsListPage;
