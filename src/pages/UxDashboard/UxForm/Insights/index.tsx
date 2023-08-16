import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { setInsightIndex, setModalOpen } from "../../uxDashboardSlice";
import { FormInsight } from "../FormProvider";
import { InsightCard } from "./InsightCard";
import { useAppDispatch } from "src/store";
import InsightModal from "./InsightModal";
import { AddNew } from "../components/AddNew";

const InsightSection = () => {
  const dispatch = useAppDispatch();
  return (
    <Card title="Scoperte" className="aq-mb-3">
      <FieldArray
        name="insights"
        render={({ form, remove, push, name }) => (
          <BSGrid data-qa="insights-list" className="aq-mb-3">
            <InsightModal fieldName={name} />
            {form.values[name].map((insight: FormInsight, index: number) => (
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
            ))}
            <BSCol size="col-lg-4">
              <Card shadow>
                <AddNew
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
                </AddNew>
              </Card>
            </BSCol>
          </BSGrid>
        )}
      />
    </Card>
  );
};

export default InsightSection;
