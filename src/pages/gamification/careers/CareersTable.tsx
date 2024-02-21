import { Button, Table } from "@appquality/appquality-design-system";
import { ReactComponent as EditIcon } from "src/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import siteWideMessageStore from "src/redux/siteWideMessages";
import {
  useDeleteAgreementsByAgreementIdMutation,
  useGetAgreementsQuery,
} from "src/services/tryberApi";
import styled from "styled-components";

const TableContainer = styled.div`
  background-color: white;
  padding: 1rem;
`;

const CareersTable = ({
  data,
}: {
  data: {
    id: number;
    rank: string;
    area: string;
    completedCp: number;
    uploadedBugs: number;
    uploadedBugsLow: number;
    uploadedBugsMedium: number;
    uploadedBugsHigh: number;
    uploadedBugsCritical: number;
    courses: { id: number; name: string }[];
  }[];
}) => {
  //const [deleteAgreement] = useDeleteAgreementsByAgreementIdMutation();
  const { add } = siteWideMessageStore();
  //const { data, refetch } = useGetAgreementsQuery({});

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Completed CPs",
      dataIndex: "completedCp",
      key: "completedCp",
    },
    {
      title: "Uploaded Bugs",
      dataIndex: "uploadedBugs",
      key: "uploadedBugs",
    },
    {
      title: "Uploaded Bugs LOW",
      dataIndex: "uploadedBugsLow",
      key: "uploadedBugsLow",
    },
    {
      title: "Uploaded Bugs MEDIUM",
      dataIndex: "uploadedBugsMedium",
      key: "uploadedBugsMedium",
    },
    {
      title: "Uploaded Bugs HIGH",
      dataIndex: "uploadedBugsHigh",
      key: "uploadedBugsHigh",
    },
    {
      title: "Uploaded Bugs CRITICAL",
      dataIndex: "uploadedBugsCritical",
      key: "uploadedBugsCritical",
    },
    {
      title: "Required  Courses",
      dataIndex: "courses",
      key: "courses",
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
        `Are you sure you want to delete this Career? ID: ${id}, Title: ${title}`
      ) === true
    ) {
      // deleteAgreement({ agreementId: id })
      //     .unwrap()
      //     .then((res) => {
      //         //refetch();
      //         add({ type: "success", message: "Career Deleted" });
      //     })
      //     .catch((err) => {
      //         //refetch();
      //         add({
      //             type: "danger",
      //             message: "There was an error",
      //         });
      //     });
    }
  };

  return (
    <TableContainer data-qa="careers-table">
      <Table
        columns={columns}
        dataSource={
          data
            ? data?.map((a) => ({
                key: a.id,
                id: a.id,
                rank: a.rank,
                area: a.area,
                completedCp: a.completedCp,
                uploadedBugs: a.uploadedBugs,
                uploadedBugsLow: a.uploadedBugsLow,
                uploadedBugsMedium: a.uploadedBugsMedium,
                uploadedBugsHigh: a.uploadedBugsHigh,
                uploadedBugsCritical: a.uploadedBugsCritical,
                courses: a.courses.map((c) => c.name).join(", "),
                actions: (
                  <div title="Actions">
                    <Button
                      // TODO: add useNavigate
                      onClick={() => {}}
                      size="sm"
                      type="link"
                    >
                      <EditIcon />
                    </Button>
                    {/* <Button
                                        data-qa={`delete-career-button-${a.id}`}
                                        onClick={() => onDelete(a.id.toString(), a.title)}
                                        size="sm"
                                        type="link"
                                    >
                                        <DeleteIcon />
                                    </Button> */}
                  </div>
                ),
              }))
            : []
        }
      />
    </TableContainer>
  );
};

export default CareersTable;
