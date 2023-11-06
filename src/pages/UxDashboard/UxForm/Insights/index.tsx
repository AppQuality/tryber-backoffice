import {
  BSCol,
  BSGrid,
  Card,
  FormLabel,
  Title,
} from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { setInsightIndex, setInsightModalOpen } from "../../uxDashboardSlice";
import { FormInsight, FormValuesInterface } from "../FormProvider";
import { useFormikContext } from "formik";
import { InsightCard } from "./InsightCard";
import { useAppDispatch } from "src/store";
import InsightModal from "./InsightModal";
import { AddNew } from "../components/AddNew";
import { v4 as uuidv4 } from "uuid";
import DragNDropProvider from "../DragNDropProvider";
import { OnDragEndResponder } from "react-beautiful-dnd";

type NewFormInsight = Pick<
  FormInsight,
  "internalId" | "title" | "description" | "videoParts"
>;

export const fieldName = "insights";

const InsightSection = () => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<FormValuesInterface>();
  const insights = values[fieldName];
  return (
    <Card title="Scoperte" className="aq-mb-3" data-qa="insights-list">
      test e2e
      <FieldArray
        name={fieldName}
        render={({ form, remove, push, move }) => {
          const handleDragEnd: OnDragEndResponder = (result) => {
            if (!result.destination) {
              return;
            }
            move(result.source.index, result.destination.index);
          };
          return (
            <>
              <InsightModal remove={remove} />
              <BSGrid className="aq-mb-3">
                <BSCol size="col-lg-8">
                  {insights && insights.length > 0 && (
                    <DragNDropProvider<FormInsight>
                      onDragEnd={handleDragEnd}
                      items={insights}
                      renderItem={(insight, index, dragHandleProps) => (
                        <InsightCard
                          insight={insight}
                          index={index}
                          removeInsight={remove}
                          dragHandleProps={dragHandleProps}
                        />
                      )}
                    />
                  )}
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
                      dispatch(setInsightModalOpen(true));
                    }}
                  >
                    Aggiungi scoperta
                  </AddNew>
                </BSCol>
                <BSCol size="col-lg-4">
                  <FormLabel htmlFor="" label="Cos’è questo campo?" />
                  <Card>
                    <Title size="xs" className="aq-text-info">
                      È l'executive summary del test, dove ogni scoperta è
                      associata ad uno o più video.
                    </Title>
                  </Card>
                </BSCol>
              </BSGrid>
            </>
          );
        }}
      />
    </Card>
  );
};

export default InsightSection;
