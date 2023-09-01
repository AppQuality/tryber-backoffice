import { useAppDispatch } from "src/store";
import { useFormikContext } from "formik";
import { AddNew } from "../components/AddNew";
import { Card } from "@appquality/appquality-design-system";
import { FormValuesInterface } from "../FormProvider";
import SentimentChartModal from "./SentimentModal";
import SentimentCard from "./SentimentCard";
import { setSentimentModalOpen } from "../../uxDashboardSlice";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";

export const fieldName = "sentiments";

const SentimentSection = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<FormValuesInterface>();
  const { data } = useGetCampaignsByCampaignClustersQuery({ campaign: id });
  const sentiments = values[fieldName];
  return (
    <Card
      title="Sentiment"
      className="aq-mb-3"
      data-qa="sentiment-chart-section"
    >
      <SentimentChartModal />
      {sentiments &&
        sentiments.map((sentiment, index: number) => (
          <SentimentCard
            sentiment={sentiment}
            title={`${index + 1}. ${
              data?.items.find((cluster) => cluster.id === sentiment.clusterId)
                ?.name
            }`}
          />
        ))}
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
