import {
  Button,
  Modal,
  Field,
  FieldProps,
  FormikField,
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
import { resetInsight, setInsightModalOpen } from "../../uxDashboardSlice";
import styled from "styled-components";
import SeverityField from "../components/fields/SeverityField";
import ClusterField from "../components/fields/ClusterField";
import VideoParts from "../VideoParts";
import {
  FormValuesInterface,
  insightDescriptionMaxChar,
} from "../FormProvider";
import { useMemo } from "react";
import { fieldName } from ".";

interface InsightModalProps {
  remove: (index: number) => void;
}
const StyledModal = styled(Modal)`
  .modal {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
  }
`;

const ModalFooter = ({ remove }: InsightModalProps) => {
  const dispatch = useAppDispatch();
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const {
    submitForm,
    setFieldTouched,
    setFieldValue,
    errors,
    values,
    initialValues,
  } = useFormikContext<FormValuesInterface>();
  const isNewInsight = useMemo(
    () => !values[fieldName][insightIndex].id,
    [values, insightIndex]
  );
  const handleAdd = () => {
    if (errors[fieldName] && errors[fieldName][insightIndex]) {
      setFieldTouched(`${fieldName}[${insightIndex}].title`);
      setFieldTouched(`${fieldName}[${insightIndex}].description`);
      setFieldTouched(`${fieldName}[${insightIndex}].cluster`); // could be a string or an object
      setFieldTouched(`${fieldName}[${insightIndex}].severity.id`);

      const insightErrors = errors[fieldName][insightIndex];
      Object.keys(insightErrors).forEach((key) => {
        if (
          key === "videoParts" &&
          typeof insightErrors === "object" &&
          typeof insightErrors.videoParts !== "string"
        ) {
          insightErrors.videoParts?.forEach((videoPart, videoPartIndex) => {
            Object.keys(videoPart).forEach((videoPartKey) => {
              setFieldTouched(
                `${fieldName}[${insightIndex}].videoParts[${videoPartIndex}].${videoPartKey}`
              );
            });
          });
        }
      });
      alert("compila tutti i campi obbligatori");
      return;
    }
    submitForm();
    dispatch(resetInsight());
    dispatch(setInsightModalOpen(false));
  };
  const handleClose = async () => {
    dispatch(resetInsight());
    dispatch(setInsightModalOpen(false));
  };
  const handleDismiss = async () => {
    if (isNewInsight) remove(insightIndex);
    if (!isNewInsight) setFieldValue(fieldName, initialValues[fieldName]);
    handleClose();
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        data-qa="discard-insight-changes"
        type="danger"
        flat
        onClick={handleDismiss}
        className="aq-mr-3"
      >
        Dismiss
      </Button>
      <Button htmlType="button" data-qa="save-insight" onClick={handleAdd}>
        Save
      </Button>
    </div>
  );
};

const InsightModal = ({ remove }: InsightModalProps) => {
  const { insightIndex, isInsightModalOpen } = useAppSelector(
    (state) => state.uxDashboard
  );
  return (
    <StyledModal
      isOpen={isInsightModalOpen}
      closeOnClickOutside={false}
      onClose={() => {
        /* silence */
      }}
      footer={<ModalFooter remove={remove} />}
    >
      <div data-qa="insight-form">
        <BSGrid>
          <BSCol size="col-lg-9">
            <Title size="s" className="aq-mb-2">
              Cosa e dove<span className="aq-text-danger">*</span>
            </Title>
            <FormLabel
              htmlFor=""
              label="Come classifichiamo questa scoperta? A quali cluster fa riferimento?"
            />
            <BSGrid>
              <BSCol>
                <FormikField name={`${fieldName}[${insightIndex}].severity`}>
                  {(fieldProps: FieldProps) => (
                    <SeverityField {...fieldProps} />
                  )}
                </FormikField>
              </BSCol>
              <BSCol>
                <FormikField name={`${fieldName}[${insightIndex}].cluster`}>
                  {(fieldProps: FieldProps) => <ClusterField {...fieldProps} />}
                </FormikField>
              </BSCol>
            </BSGrid>
          </BSCol>
          <BSCol size="col-lg-3" />
        </BSGrid>
        <BSGrid>
          <Title size="s" className="aq-mb-2">
            Contenuto<span className="aq-text-danger">*</span>
          </Title>
          <BSCol size="col-lg-9">
            <Field
              name={`${fieldName}[${insightIndex}].title`}
              label="Title"
              placeholder="Es: “Malfunzionamenti Form”"
              data-qa="insight-title"
            />
            <div data-qa="insight-description">
              <TextareaField
                height="8em"
                counterMax={insightDescriptionMaxChar}
                name={`${fieldName}[${insightIndex}].description`}
                label={
                  <div>
                    Descrizione{" "}
                    <strong>
                      (Massimo {insightDescriptionMaxChar} caratteri)
                    </strong>
                  </div>
                }
              />
            </div>
          </BSCol>
          <BSCol size="col-lg-3">
            <FormLabel htmlFor="" label="Cos’è questo campo?" />
            <Card>
              <Title size="xs" className="aq-text-info aq-mb-3">
                Scegli un titolo composto da:
              </Title>
              <Text small>Tipo di problema/aspetto positivo:</Text>
              <Text className="aq-mb-2">
                ”Malfunzionamenti”, “Difficoltà di navigazione”, “Criticità”
              </Text>
              <Text small className="aq-mb-2">
                +
              </Text>
              <Text small>Touchpoint/Componente/Sezione:</Text>
              <Text className="aq-mb-2">
                ”Sito Desktop”, “Form”, “Pagina Prodotto”...
              </Text>
              <Text small>Ad esempio:</Text>
              <Text className="aq-mb-2">
                ”Criticità sull'esperienza desktop”
              </Text>
              <Title size="xs" className="aq-text-info">
                Descrivi poi brevemente in cosa consiste il
                problema/need/feedback positivo individuato
              </Title>
            </Card>
          </BSCol>
        </BSGrid>
        <BSGrid>
          <BSCol size="col-lg-9" className="aq-mb-4 aq-pb-4">
            <Title size="s" className="aq-mb-2">
              Evidenze (Spezzoni Video)
            </Title>
            <FormLabel
              htmlFor=""
              label="Aggiungi un’evidenza selezionando lo spezzone del video da collegare."
            />
            <VideoParts />
          </BSCol>
          <BSCol size="col-lg-3" />
        </BSGrid>
      </div>
    </StyledModal>
  );
};

export default InsightModal;
