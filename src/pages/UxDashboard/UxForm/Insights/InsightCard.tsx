import {
  Card,
  Pill,
  Button,
  Title,
} from "@appquality/appquality-design-system";
import SeverityPill from "../components/SeverityPill";
import { setInsightIndex, setModalOpen } from "../../uxDashboardSlice";
import { FormInsight, FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import { useAppDispatch } from "src/store";
import { setSelectedInsight } from "../../uxDashboardSlice";
import { Film } from "react-bootstrap-icons";
import styled from "styled-components";

const InsightPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.grid.sizes[1]};
`;

interface InsightCardProps {
  insight: FormInsight;
  index: number;
  removeInsight: (index: number) => void;
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InsightCard = ({
  insight,
  removeInsight,
  index,
}: InsightCardProps) => {
  const { submitForm } = useFormikContext<FormValuesInterface>();
  const dispatch = useAppDispatch();
  function editInsight(insight: FormInsight): void {
    dispatch(setSelectedInsight(insight));
    dispatch(setModalOpen(true));
  }

  const Actions = () => (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button
        htmlType="button"
        flat
        type="danger"
        size="sm"
        onClick={() => {
          window.confirm("Are you sure you wish to delete this item?") &&
            removeInsight(index);
          submitForm();
        }}
        data-qa="delete-insight"
      >
        Delete
      </Button>
      <Button
        htmlType="button"
        flat
        size="sm"
        type="primary"
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
    <Card
      className="aq-mb-3"
      title={
        <CardHeader>
          Scoperta {index + 1}
          <Actions />
        </CardHeader>
      }
      data-qa={`insight-card-${index}`}
    >
      <Title size="s" className="aq-mb-3">
        {insight.title}
      </Title>
      <div className="aq-mb-3">{insight.description}</div>
      <CardFooter>
        <InsightPillsWrapper className="aq-mb-3" data-qa={`insight-pills`}>
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
        <div>
          <Film size={16} style={{ marginBottom: "-2px" }} />{" "}
          {insight.videoParts.length} video
        </div>
      </CardFooter>
    </Card>
  );
};
