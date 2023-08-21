import { Card, Pill, Button } from "@appquality/appquality-design-system";
import SeverityPill from "../components/SeverityPill";
import { setInsightIndex, setModalOpen } from "../../uxDashboardSlice";
import { FormInsight, FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import { useAppDispatch } from "src/store";
import { setSelectedInsight } from "../../uxDashboardSlice";
import styled from "styled-components";

const InsightPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.grid.sizes[1]};
  margin-bottom: ${({ theme }) => theme.grid.sizes[2]};
`;

interface InsightCardProps {
  insight: FormInsight;
  index: number;
  removeInsight: (index: number) => void;
}

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
  return (
    <Card title={insight.title} className={`qa-insight-card-${index}`}>
      <div className="aq-mb-3">{insight.description}</div>
      <div>
        <InsightPillsWrapper className="aq-mb-3">
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
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            htmlType="button"
            flat
            type="danger"
            size="block"
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
            type="primary"
            size="block"
            onClick={() => {
              editInsight(insight);
              dispatch(setInsightIndex(index));
            }}
            data-qa="edit-insight"
          >
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};
