import {
  Button,
  Modal,
  Field,
  TextareaField,
  Title,
  Text,
  FormLabel,
  BSGrid,
  BSCol,
  Card,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  resetInsight,
  setInsightModalOpen,
  setSentimentModalOpen,
} from "../../uxDashboardSlice";
import styled from "styled-components";
import { FormValuesInterface } from "../FormProvider";
import { fieldName } from ".";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";
import { useParams } from "react-router-dom";

const StyledModal = styled(Modal)`
  .modal {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
  }
`;

const ModalFooter = () => {
  const dispatch = useAppDispatch();
  // const {
  //   submitForm,
  //   setFieldTouched,
  //   setFieldValue,
  //   errors,
  //   values,
  //   initialValues,
  // } = useFormikContext<FormValuesInterface>();

  const closeModal = async () => {
    dispatch(setSentimentModalOpen(false));
    //if (isNewInsight) remove(insightIndex);
    //if (!isNewInsight) setFieldValue(fieldName, initialValues[fieldName]);
  };
  const handleDismiss = async () => {
    closeModal();
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        data-qa="discard-sentiments"
        type="danger"
        flat
        onClick={handleDismiss}
        className="aq-mr-2"
      >
        Dismiss
      </Button>
      <Button htmlType="button" data-qa="save-sentiment-chart">
        Save
      </Button>
    </div>
  );
};

const SentimentChartModal = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignClustersQuery({ campaign: id });
  const { isSentimentModalOpen } = useAppSelector((state) => state.uxDashboard);
  const handleClose = async () => {
    dispatch(resetInsight());
    dispatch(setInsightModalOpen(false));
  };
  return (
    <StyledModal
      isOpen={isSentimentModalOpen}
      onClose={handleClose}
      closeOnClickOutside={false}
      footer={<ModalFooter />}
    >
      <div data-qa="sentiment-chart-form">
        <BSGrid>
          <Title size="xl" className="aq-mb-3">
            Sentiment
          </Title>
          <BSCol size="col-lg-9">
            {data?.items.map(() => (
              <Card data-qa="sentiment-score-card" className="aq-mb-3">
                <Field
                  name={`${fieldName}.score`}
                  label="Score"
                  data-qa="sentiment-score"
                />
                <TextareaField
                  height="8em"
                  name={`${fieldName}.description`}
                  label="Description"
                />
              </Card>
            ))}
          </BSCol>
          <BSCol size="col-lg-3">
            <FormLabel htmlFor="" label="Cos'è questo campo?" />
            <Card className="aq-mb-3">
              <Title size="xs" className="aq-text-info aq-mb-3">
                Individua gli Use Case più critici per gli utenti
              </Title>
              <Text small>Nota bene:</Text>
              <Text>
                Questi dati restituiscono una{" "}
                <strong>Journey degli stati d'animo</strong> degli utenti nei
                vari Use Case.
              </Text>
            </Card>
            <FormLabel htmlFor="" label="Come scrivere i commenti" />
            <Card className="aq-mb-3">
              <Title size="xs" className="aq-text-info aq-mb-3">
                Combina:
              </Title>
              <Text small>Aggettivo:</Text>
              <Text className="aq-mb-2">
                che descrive l'esperienza d'uso
                <br />
                ”Difficile”, “Piacevole”, “Critico”, “Facile”, “Sorprendente”...
              </Text>
              <Text small>+</Text>
              <Text small>Azione:</Text>
              <Text>
                legata all'aggettivo
                <br />
                ”Orientarsi”, “Scoprire”, “Leggere”, “Accedere”...
              </Text>
              <Text small>
                Indicazione precisa del touchpoint dove è avvenuta l'azione:
              </Text>
              <Text className="aq-mb-2">
                (sezione di una homepage, descrizione di una pagina prodotto,
                scelta del metodo di pagamento...)
              </Text>
              <Text small>+</Text>
              <Text small>Motivazione:</Text>
              <Text className="aq-mb-2">
                di questo stato d’animo
                <br />
                (per problemi di accessibilità, per la confusione della
                struttura delle informazioni, per una localizzazione linguistica
                sbagliata...)
              </Text>
              <Text small>Ad esempio:</Text>
              <Text>
                ”Piacevole leggere informazioni chiare sulla spedizione per
                avere un quadro completo. / Utile avere informazioni chiare
                sulla spedizione per un quadro completo.”
              </Text>
            </Card>
          </BSCol>
        </BSGrid>
      </div>
    </StyledModal>
  );
};

export default SentimentChartModal;
