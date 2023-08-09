import {
  Button,
  Modal,
  Field,
  FieldProps,
  FormikField,
  TextareaField,
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
}: InsightModalProps) => {
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
          Cancel
        </Button>
        <Button data-qa="save-new-insight" flat onClick={handleAdd}>
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
    >
      <div data-qa="insight-form">
        <Field name={`insights[${insightIndex}].title`} label="Title" />
        <TextareaField
          name={`insights[${insightIndex}].description`}
          label="Description"
        />
        <FormikField name={`insights[${insightIndex}].severity`}>
          {(fieldProps: FieldProps) => <SeverityField {...fieldProps} />}
        </FormikField>
        <FormikField name={`insights[${insightIndex}].cluster`}>
          {(fieldProps: FieldProps) => <ClusterField {...fieldProps} />}
        </FormikField>
        <Observations />
      </div>
    </StyledModal>
  );
};

export default InsightModal;
