import { Button, Card } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import {
  useGetCampaignsByCampaignClustersQuery,
  useGetCampaignsByCampaignUxQuery,
} from "src/services/tryberApi";
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
  const { data: clusterData } = useGetCampaignsByCampaignClustersQuery({
    campaign: id,
  });
  const { data: uxData } = useGetCampaignsByCampaignUxQuery({
    campaign: id,
  });
  const sentiments = values[fieldName];
  return (
    <Card
      title={
        <SentimentSectionWrapper data-qa="sentiment-chart-section-title">
          <div>Sentiment</div>
          <div>
            {uxData?.sentiments && uxData?.sentiments.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </SentimentSectionWrapper>
      }
      className="aq-mb-3"
      data-qa="sentiment-chart-section"
    >
      <SentimentChartModal />
      <SentimentDeleteModal />
      {uxData?.sentiments && uxData.sentiments.length > 0 && sentiments ? (
        sentiments.map((sentiment, index: number) => (
          <SentimentCard
            sentiment={sentiment}
            title={`${index + 1}. ${
              clusterData?.items.find(
                (cluster) => cluster.id === sentiment?.clusterId
              )?.name
            }`}
          />
        ))
      ) : (
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
