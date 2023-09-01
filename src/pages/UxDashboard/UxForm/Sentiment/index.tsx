import { Button, Card } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import {
  setSentimentDeleteModalOpen,
  setSentimentModalOpen,
} from "../../uxDashboardSlice";
import { FormValuesInterface } from "../FormProvider";
import { AddNew } from "../components/AddNew";
import SentimentCard from "./SentimentCard";
import SentimentDeleteModal from "./SentimentDeleteModal";
import SentimentChartModal from "./SentimentModal";

export const fieldName = "sentiments";

const SentimentSection = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<FormValuesInterface>();
  const { data } = useGetCampaignsByCampaignClustersQuery({ campaign: id });
  const sentiments = values[fieldName];
  return (
    <Card
      title={
        <div data-qa="sentiment-chart-section-title">
          <div>Sentiment</div>
          <div>
            <Button
              data-qa="delete-sentiment-chart-button"
              onClick={() => dispatch(setSentimentDeleteModalOpen(true))}
            >
              Delete
            </Button>
          </div>
        </div>
      }
      className="aq-mb-3"
      data-qa="sentiment-chart-section"
    >
      <SentimentChartModal />
      <SentimentDeleteModal />
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
