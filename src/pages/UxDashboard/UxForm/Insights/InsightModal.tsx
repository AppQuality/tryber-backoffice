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
import { resetInsight, setModalOpen } from "../../uxDashboardSlice";
import styled from "styled-components";
import SeverityField from "../components/fields/SeverityField";
import ClusterField from "../components/fields/ClusterField";
import VideoParts from "../VideoParts";
import { FormValuesInterface } from "../FormProvider";
import { useMemo } from "react";

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

const fieldName = "insights";

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
    if (errors.insights && errors.insights[insightIndex]) {
      setFieldTouched(`${fieldName}[${insightIndex}].title`);
      setFieldTouched(`${fieldName}[${insightIndex}].description`);
      setFieldTouched(`${fieldName}[${insightIndex}].cluster`); // could be a string or an object
      setFieldTouched(`${fieldName}[${insightIndex}].severity.name`);

      alert("compila tutti i campi obbligatori");
      return;
    }
    submitForm();
    dispatch(resetInsight());
    dispatch(setModalOpen(false));
  };
  const handleClose = async () => {
    dispatch(resetInsight());
    dispatch(setModalOpen(false));
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
  const dispatch = useAppDispatch();
  const { insightIndex, isModalOpen } = useAppSelector(
    (state) => state.uxDashboard
  );
  const handleClose = async () => {
    dispatch(resetInsight());
    dispatch(setModalOpen(false));
  };
  return (
    <StyledModal
      isOpen={isModalOpen}
      onClose={handleClose}
      closeOnClickOutside={false}
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
                name={`${fieldName}[${insightIndex}].description`}
                label="Description"
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
                ”Criticità sull’esperienza desktop”
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
