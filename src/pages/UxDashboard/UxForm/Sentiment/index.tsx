import { Button, Card } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import styled from "styled-components";
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

const SentimentSectionWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const SentimentSection = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<FormValuesInterface>();
  const { data } = useGetCampaignsByCampaignClustersQuery({ campaign: id });
  const sentiments = values[fieldName];
  return (
    <Card
      title={
        <SentimentSectionWrapper data-qa="sentiment-chart-section-title">
          <div>Sentiment</div>
          <div>
            <Button
              flat
              className="aq-mr-2"
              size="sm"
              data-qa="edit-sentiment-chart"
              onClick={() => {
                dispatch(setSentimentModalOpen(true));
              }}
            >
              Edit
            </Button>
            <Button
              flat
              size="sm"
              type="danger"
              data-qa="delete-sentiment-chart-button"
              onClick={() => dispatch(setSentimentDeleteModalOpen(true))}
            >
              Delete
            </Button>
          </div>
        </SentimentSectionWrapper>
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
