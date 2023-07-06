import {
  BSCol,
  BSGrid,
  Button,
  Table,
  Title,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import getAllAgreements from "src/api/getAllAgreements";
import FilterContext from "src/pages/BugsList/FilterContext";
import styled from "styled-components";
import CustomersFilter from "src/pages/agreements/list/Filters/CustomersFilter";

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

const FluidContainer = styled.div`
    max-width: 90%;
    margin: 0 auto;
  }
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" type="link-hover" />;
};

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
  function setIsStatsModalOpen(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  return (
    <FluidContainer>
      <Title size="m">Agreements List</Title>

      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=mvc_campaigns`}
        type="secondary"
        className="aq-mr-2"
      >
        New Agreement
      </HeaderButton>
      <FilterContext>
        <div className="aq-mb-4">
          <CustomersFilter id="1" />
        </div>
        <BSGrid>
          <BSCol size="col-lg-12">
            <Table columns={columns} dataSource={agreements} />
          </BSCol>
        </BSGrid>
      </FilterContext>
    </FluidContainer>
  );
};

export default AgreementsListPage;
