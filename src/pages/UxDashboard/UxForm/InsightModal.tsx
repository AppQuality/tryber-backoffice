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
import { resetInsight } from "../uxDashboardSlice";
import styled from "styled-components";
import SeverityField from "../components/fields/SeverityField";
import ClusterField from "../components/fields/ClusterField";
import Observations from "../components/fields/Observations";
import { FormValuesInterface } from "./FormProvider";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  removeInsight: (index: number) => void;
  fieldName: string;
}
const StyledModal = styled(Modal)`
  .modal {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }
`;

const InsightModal = ({
  isOpen,
  onClose,
  removeInsight,
  fieldName,
}: InsightModalProps) => {
  console.log(fieldName);
  const dispatch = useAppDispatch();
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const { submitForm, setFieldTouched, errors, resetForm } =
    useFormikContext<FormValuesInterface>();
  const handleAdd = () => {
    if (errors.insights && errors.insights[insightIndex]) {
      setFieldTouched(`insights[${insightIndex}].title`);
      setFieldTouched(`insights[${insightIndex}].description`);
      setFieldTouched(`insights[${insightIndex}].cluster`);
      setFieldTouched(`insights[${insightIndex}].severity`);
      alert("compila tutti i campi obbligatori");
      return;
    }
    submitForm();
    dispatch(resetInsight());
    onClose();
  };
  const handleClose = async () => {
    resetForm();
    dispatch(resetInsight());
    onClose();
  };
  const ModalFooter = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          data-qa="discard-new-insight"
          type="danger"
          htmlType="reset"
          flat
          onClick={handleClose}
          className="aq-mr-3"
        >
          Dismiss
        </Button>
        <Button data-qa="save-new-insight" onClick={handleAdd}>
          Save
        </Button>
      </div>
    );
  };
  return (
    <StyledModal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnClickOutside={false}
      footer={<ModalFooter />}
      title="Scoperte"
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
                <FormikField name={`insights[${insightIndex}].severity`}>
                  {(fieldProps: FieldProps) => (
                    <SeverityField {...fieldProps} />
                  )}
                </FormikField>
              </BSCol>
              <BSCol>
                <FormikField name={`insights[${insightIndex}].cluster`}>
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
              name={`insights[${insightIndex}].title`}
              label="Title"
              placeholder="Es: “Malfunzionamenti Form”"
            />
            <TextareaField
              height="8em"
              name={`insights[${insightIndex}].description`}
              label="Description"
            />
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
          <BSCol size="col-lg-9">
            <Title size="s" className="aq-mb-2">
              Evidenze (Spezzoni Video)
            </Title>
            <FormLabel
              htmlFor=""
              label="Il numero consigliato di domande di ricerca è 3"
            />
            <Observations />
          </BSCol>
          <BSCol size="col-lg-3" />
        </BSGrid>
      </div>
    </StyledModal>
  );
};

export default InsightModal;
