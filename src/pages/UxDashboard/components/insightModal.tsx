import {
  Button,
  Modal,
  Field,
  FieldProps,
  FormikField,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useAppDispatch, useAppSelector } from "src/store";
import { resetInsight } from "../uxDashboardSlice";
import styled from "styled-components";
import SeverityField from "./fields/SeverityField";
import ClusterField from "./fields/ClusterField";
import Observations from "./fields/Observations";

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const StyledModal = styled(Modal)`
  .modal {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }
`;

export const InsightModal = ({ isOpen, onClose }: InsightModalProps) => {
  const dispatch = useAppDispatch();
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const handleClose = () => {
    dispatch(resetInsight());
    onClose();
  };
  const ModalFooter = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          data-qa="discard-new-insight"
          type="danger"
          flat
          onClick={handleClose}
          className="aq-mr-3"
        >
          Discard
        </Button>
        <Button data-qa="save-new-insight" flat onClick={handleClose}>
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
