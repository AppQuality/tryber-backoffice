import {
  Table,
  Pagination,
  Card,
  icons,
  aqBootstrapTheme as theme,
  Modal,
} from "@appquality/appquality-design-system";
import {
  useGetCampaignsByCampaignBugsQuery,
  GetCampaignsByCampaignBugsApiArg,
} from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";
import { Button as AppQualityButton } from "@appquality/appquality-design-system";
import { ReactComponent as InfoIcon } from "src/assets/info-icon.svg";
import Button from "./TableButton";
import Severity from "./Severity";
import Type from "./Type";
import AiSuggestion from "./AISuggestion";
import AiScore from "./AiScore";
import { useState } from "react";

const LIMIT = 100;

const StarFill = icons.StarFill;

const BugsTable = ({ id }: { id: string }) => {
  const { filters, page, setPage, order, setOrder } = useFiltersCardContext();
  const [scoreModal, setScoreModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  let orderBy: GetCampaignsByCampaignBugsApiArg["orderBy"] = "id";
  if (order.field === "internalId") orderBy = "id";
  if (order.field === "tester") orderBy = "testerId";
  if (order.field === "type") orderBy = "type";
  if (order.field === "severity") orderBy = "severity";
  if (order.field === "status") orderBy = "status";

  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
    limit: LIMIT,
    start: (page - 1) * LIMIT,
    filterBy: {
      severities: filters.severities ? filters.severities.join(",") : undefined,
      types: filters.types ? filters.types.join(",") : undefined,
      status: filters.status ? filters.status.join(",") : undefined,
      tags: filters.tags ? filters.tags.join(",") : undefined,
      duplication: filters.duplication
        ? filters.duplication.join(",")
        : undefined,
    },
    search: filters.search ? filters.search : undefined,
    orderBy: orderBy,
    order: order ? order.direction : undefined,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  return (
    <Card className="aq-mb-3" bodyClass="" title={`${data.total} Bugs`}>
      <Table
        isStriped
        dataSource={data.items.map((r) => {
          let statusColor = theme.palette.primary;
          if (r.status.id === 1) statusColor = theme.palette.danger;
          if (r.status.id === 2) statusColor = theme.palette.success;
          if (r.status.id === 3) statusColor = theme.palette.info;
          if (r.status.id === 4) statusColor = theme.palette.warning;
          return {
            key: r.id,
            internalId: r.internalId,
            title: {
              title: r.title,
              content: (
                <>
                  {r.isFavourite ? <StarFill className="aq-mx-2" /> : null}
                  {r.title}
                </>
              ),
            },
            severity: {
              title: r.severity.name,
              content: <Severity severity={r.severity} />,
            },
            ai_suggestion: {
              content: <AiSuggestion campaignId={id} bugId={r.id} />,
            },
            score: {
              content: <AiScore campaignId={id} bugId={r.id} />,
            },
            status: {
              title: r.status.name,
              content: r.status.name,
              style: {
                backgroundColor: statusColor,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.white,
              },
            },
            type: {
              title: r.type.name,
              content: <Type type={r.type} />,
            },
            tester: `T${r.tester.id}`,
            action: {
              title: "",
              content: (
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    href={`/wp-admin/admin.php?page=mvc_bugs-edit&id=${r.id}`}
                    style={{ margin: "0 4px 0 0" }}
                  >
                    Review
                  </Button>
                </div>
              ),
            },
          };
        })}
        orderBy={order.field}
        order={order.direction}
        columns={[
          {
            title: "Id",
            dataIndex: "internalId",
            key: "internalId",
            maxWidth: "20ch",
            isSortable: true,
            onSort: (newSort) => setOrder("internalId", newSort),
          },
          {
            title: "Tester",
            dataIndex: "tester",
            key: "tester",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("tester", newSort),
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: (
              <div>
                <span>AI Suggestion</span>
                <AppQualityButton
                  onClick={() => setStatusModal(true)}
                  kind="transparent"
                  style={{ padding: 0, paddingLeft: 4 }}
                >
                  <InfoIcon />
                </AppQualityButton>
              </div>
            ),
            dataIndex: "ai_suggestion",
            key: "ai_suggestion",
            maxWidth: "25ch",
          },
          {
            title: (
              <div>
                <span>Score</span>
                <AppQualityButton
                  onClick={() => setScoreModal(true)}
                  kind="transparent"
                  style={{ padding: 0, paddingLeft: 4 }}
                >
                  <InfoIcon />
                </AppQualityButton>
              </div>
            ),
            dataIndex: "score",
            key: "score",
            maxWidth: "15ch",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("status", newSort),
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            maxWidth: "13ch",
            isSortable: true,
            onSort: (newSort) => setOrder("type", newSort),
          },
          {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("severity", newSort),
          },
          {
            title: "",
            dataIndex: "action",
            key: "action",
            maxWidth: "10ch",
            align: "right",
          },
        ]}
      />
      {data.total && data.limit ? (
        <Pagination
          onPageChange={(newPage) => setPage(newPage)}
          current={page}
          maxPages={Math.ceil(data.total / data.limit)}
        />
      ) : null}
      {scoreModal && (
        <Modal
          isOpen={scoreModal}
          onClose={() => setScoreModal(false)}
          title="AI Score"
        >
          <p>
            The AI Score is a percentage that reflects how accurately the tester
            has evaluated the bug according to the AI based on several criteria
            — including scope relevance, a well-formed title and aligned to the
            usecase, a clear description, appropriate severity, correct type,
            and attached media.
          </p>
        </Modal>
      )}
      {statusModal && (
        <Modal
          isOpen={statusModal}
          onClose={() => setStatusModal(false)}
          title="AI Suggestion"
        >
          <p>
            The AI Suggestion is a status recommendation provided by the AI
            based on the score percentage achieved by the bug based on the score
            criteria. It can be:
            <br />
            Approved : 60% or more
            <br />
            Need Review : Between 40% and 60%
            <br />
            Refused : Less than 40%
          </p>
        </Modal>
      )}
    </Card>
  );
};

export default BugsTable;
