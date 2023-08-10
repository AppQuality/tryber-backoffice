import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { setInsightIndex, setModalOpen } from "../../uxDashboardSlice";
import { FormValuesInterface } from "../FormProvider";
import { InsightCard } from "./InsightCard";
import { useAppDispatch } from "src/store";
import InsightModal from "./InsightModal";
import styled from "styled-components";

const AddNewInsightCTA = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-big {
    font-size: 5rem;
    line-height: 1;
  }
  transition: color 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.gray400};
  &:hover {
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const InsightSection = () => {
  const dispatch = useAppDispatch();
  return (
    <Card title="Insights" className="aq-mb-3">
      <FieldArray
        name="insights"
        render={({ form, remove, push, name }) => (
          <BSGrid data-qa="insights-list" className="aq-mb-3">
            <InsightModal fieldName={name} />
            {form.values[name].map(
              (
                insight: FormValuesInterface["insights"][number],
                index: number
              ) => (
                <BSCol
                  size="col-lg-4"
                  className="aq-mb-4"
                  key={insight.id}
                  data-qa={`insight-card-${insight.id}`}
                >
                  <InsightCard
                    insight={insight}
                    index={index}
                    removeInsight={remove}
                  />
                </BSCol>
              )
            )}
            <BSCol size="col-lg-4">
              <Card shadow>
                <AddNewInsightCTA
                  data-qa="add-new-insight"
                  onClick={() => {
                    push({
                      title: "",
                      description: "",
                      videoParts: [],
                    });
                    dispatch(setInsightIndex(form.values.insights.length));
                    dispatch(setModalOpen(true));
                  }}
                >
                  <span className="icon-big">+</span>
                  <span>Aggiungi scoperta</span>
                </AddNewInsightCTA>
              </Card>
            </BSCol>
          </BSGrid>
        )}
      />
    </Card>
  );
};

export default InsightSection;
