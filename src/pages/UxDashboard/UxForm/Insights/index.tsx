import {
  BSCol,
  BSGrid,
  Card,
  FormLabel,
  Title,
} from "@appquality/appquality-design-system";
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
    <Card title="Scoperte" className="aq-mb-3" data-qa="insights-list">
      <FieldArray
        name={fieldName}
        render={({ form, remove, push, name }) => (
          <>
            <InsightModal remove={remove} />

            <BSGrid className="aq-mb-3">
              <BSCol size="col-lg-8">
                {insights &&
                  insights.map((insight, index: number) => (
                    <InsightCard
                      insight={insight}
                      index={index}
                      removeInsight={remove}
                    />
                  ))}
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
                  Aggiungi scoperta
                </AddNew>
              </BSCol>
              <BSCol size="col-lg-4">
                <FormLabel htmlFor="" label="Cos’è questo campo?" />
                <Card>
                  <Title size="xs" className="aq-text-info">
                    È l’executive summary del test, dove ogni scoperta è
                    associata ad uno o più video.
                  </Title>
                </Card>
              </BSCol>
            </BSGrid>
          </>
        )}
      />
    </Card>
  );
};

export default InsightSection;
