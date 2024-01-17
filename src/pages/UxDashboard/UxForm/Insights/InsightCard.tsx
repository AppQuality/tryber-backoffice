import {
  Card,
  Pill,
  Button,
  Title,
} from "@appquality/appquality-design-system";
import SeverityPill from "../components/SeverityPill";
import { setInsightIndex, setInsightModalOpen } from "../../uxDashboardSlice";
import { FormInsight, FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import { useAppDispatch } from "src/store";
import { setSelectedInsight } from "../../uxDashboardSlice";
import { Film } from "react-bootstrap-icons";
import styled from "styled-components";
import Handler from "../components/Handler";

const InsightPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.grid.sizes[1]};
`;

interface InsightCardProps {
  insight: FormInsight;
  index: number;
  removeInsight: (index: number) => void;
  dragHandleProps?: any;
}

const StyledCard = styled(Card)`
  .insight-card-body {
    padding-top: ${({ theme }) => theme.grid.sizes[3]};
    padding-bottom: ${({ theme }) => theme.grid.sizes[3]};
    padding-right: ${({ theme }) => theme.grid.sizes[3]};
    display: grid;
    grid-template-columns: 30px 1fr;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 75% auto;
  grid-column-gap: ${({ theme }) => theme.grid.sizes[3]};

  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    grid-template-columns: 1fr;
    grid-row-gap: ${({ theme }) => theme.grid.sizes[3]};
  }
`;

export const InsightCard = ({
  insight,
  removeInsight,
  index,
  dragHandleProps,
}: InsightCardProps) => {
  const { submitForm } = useFormikContext<FormValuesInterface>();
  const dispatch = useAppDispatch();
  function editInsight(insight: FormInsight): void {
    dispatch(setSelectedInsight(insight));
    dispatch(setInsightModalOpen(true));
  }

  const Actions = () => (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button
        type="button"
        flat
        kind="danger"
        size="sm"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this item?")) {
            removeInsight(index);
            submitForm();
          }
        }}
        data-qa="delete-insight"
      >
        Delete
      </Button>
      <Button
        type="button"
        flat
        size="sm"
        kind="primary"
        onClick={() => {
          editInsight(insight);
          dispatch(setInsightIndex(index));
        }}
        data-qa="edit-insight"
      >
        Edit
      </Button>
    </div>
  );

  return (
    <StyledCard
      bodyClass="insight-card-body"
      className="aq-mb-3"
      title={
        <CardHeader>
          Scoperta {index + 1}
          <Actions />
        </CardHeader>
      }
      data-qa={`insight-card-${index}`}
    >
      <Handler handleDragProps={dragHandleProps} />
      <div>
        <Title size="s" className="aq-mb-3">
          {insight.title}
        </Title>
        <div className="aq-mb-3">{insight.description}</div>
        <CardFooter>
          <InsightPillsWrapper data-qa={`insight-pills`}>
            {insight?.severity && <SeverityPill severity={insight.severity} />}
            {Array.isArray(insight.cluster) &&
              insight.cluster.map((cluster) => (
                <Pill type="primary" className="aq-mr-1" key={cluster.id} flat>
                  {cluster.name}
                </Pill>
              ))}
            {insight.cluster && !Array.isArray(insight.cluster) && (
              <Pill type="primary" className="aq-mr-1" flat>
                General
              </Pill>
            )}
          </InsightPillsWrapper>
          <div style={{ textAlign: "right" }}>
            <Film size={16} style={{ marginBottom: "-2px" }} />{" "}
            {insight.videoParts.length} video
          </div>
        </CardFooter>
      </div>
    </StyledCard>
  );
};
