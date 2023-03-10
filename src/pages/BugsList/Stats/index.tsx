import { Modal, ModalBody, Table } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";

const Stats = ({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
  });
  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  const allBugs = {
    key: 1,
    cross: "Tutti",
    total: 0,
    approved: 0,
    review: 0,
    refused: 0,
    pending: 0,
  };

  const uniqueBugs = {
    key: 2,
    cross: "Unici",
    total: 0,
    approved: 0,
    review: 0,
    refused: 0,
    pending: 0,
  };

  data.items.forEach((bug) => {
    allBugs.total++;
    if (bug.status.id === 1) allBugs.refused++;
    if (bug.status.id === 2) allBugs.approved++;
    if (bug.status.id === 3) allBugs.pending++;
    if (bug.status.id === 4) allBugs.review++;
    if (bug.duplication !== "duplicated") {
      uniqueBugs.total++;
      if (bug.status.id === 1) uniqueBugs.refused++;
      if (bug.status.id === 2) uniqueBugs.approved++;
      if (bug.status.id === 3) uniqueBugs.pending++;
      if (bug.status.id === 4) uniqueBugs.review++;
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalBody>
        <Table
          dataSource={[allBugs, uniqueBugs]}
          columns={[
            {
              title: "",
              dataIndex: "cross",
              key: "cross",
            },
            {
              title: "Totale",
              dataIndex: "total",
              key: "total",
            },
            {
              title: "Approvati",
              dataIndex: "approved",
              key: "approved",
            },
            {
              title: "Review",
              dataIndex: "review",
              key: "review",
            },
            {
              title: "Rifiutati",
              dataIndex: "refused",
              key: "refused",
            },
            {
              title: "Pendenti",
              dataIndex: "pending",
              key: "pending",
            },
          ]}
        ></Table>
      </ModalBody>
    </Modal>
  );
};

export default Stats;
