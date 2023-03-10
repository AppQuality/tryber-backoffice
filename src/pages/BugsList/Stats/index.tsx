import {
  Modal,
  ModalBody,
  Table,
  Text,
  Button,
} from "@appquality/appquality-design-system";
import useCampaignStats from "./useCampaignStats";
import useCopyStatus from "./copyStatus";
import useCopyResume from "./copyResume";

const Stats = ({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { data, isLoading } = useCampaignStats(id);
  const copyStatus = useCopyStatus(id);
  const copyResume = useCopyResume(id);
  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  const allBugs = {
    ...data.allBugs,
    key: 1,
    cross: "Tutti",
  };

  const uniqueBugs = {
    ...data.uniqueBugs,
    key: 2,
    cross: "Unici",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      footer={
        <div className="aq-float-right">
          <Button onClick={() => copyStatus()} className="aq-mx-2">
            Get Status
          </Button>
          <Button onClick={() => copyResume()} className="aq-mx-2">
            Get Final Resume
          </Button>
        </div>
      }
    >
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
        <Text>
          Tester con bug: {data.activeTesters} / {data.totalTesters} (
          {data.activeTestersPercent}%)
        </Text>
      </ModalBody>
    </Modal>
  );
};

export default Stats;
