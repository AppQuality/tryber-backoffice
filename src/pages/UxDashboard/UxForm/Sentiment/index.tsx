import { useAppDispatch } from "src/store";
import { useFormikContext } from "formik";
import { AddNew } from "../components/AddNew";
import { Card } from "@appquality/appquality-design-system";
import { FormValuesInterface } from "../FormProvider";
import SentimentChartModal from "./SentimentModal";
import { setSentimentModalOpen } from "../../uxDashboardSlice";

export const fieldName = "sentiments";

const SentimentSection = () => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<FormValuesInterface>();
  const sentiments = values[fieldName];
  return (
    <Card
      title="Sentiment"
      className="aq-mb-3"
      data-qa="sentiment-chart-section"
    >
      <SentimentChartModal />
      {sentiments &&
        sentiments.map(
          (sentiment, index: number) =>
            // <SentimentCard />
            "sentiment card"
        )}
      {sentiments.length < 1 && (
        <AddNew
          data-qa="add-new-sentiment-chart"
          onClick={() => {
            dispatch(setSentimentModalOpen(true));
          }}
        >
          Aggiungi Grafico Sentiment
        </AddNew>
      )}
    </Card>
  );
};

export default SentimentSection;
