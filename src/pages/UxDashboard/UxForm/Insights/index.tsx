import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { setInsightIndex, setModalOpen } from "../../uxDashboardSlice";
import { FormInsight, FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import { InsightCard } from "./InsightCard";
import { useAppDispatch } from "src/store";
import InsightModal from "./InsightModal";
import { AddNew } from "../components/AddNew";
import { v4 as uuidv4 } from "uuid";

type NewFormInsight = Pick<
  FormInsight,
  "internalId" | "title" | "description" | "videoParts"
>;

const InsightSection = () => {
  const dispatch = useAppDispatch();
  const fieldName = "insights";
  const { values } = useFormikContext<FormValuesInterface>();
  const insights = values[fieldName];
  return (
    <Card title="Scoperte" className="aq-mb-3">
      <FieldArray
        name={fieldName}
        render={({ form, remove, push, name }) => (
          <BSGrid data-qa="insights-list" className="aq-mb-3">
            <InsightModal remove={remove} />
            {insights &&
              insights.map((insight, index: number) => (
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
                    const newInsight: NewFormInsight = {
                      internalId: uuidv4(),
                      title: "",
                      description: "",
                      videoParts: [],
                    };
                    push(newInsight);
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
