import {
  Button,
  Modal,
  BSGrid,
  BSCol,
  Text,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import {
  Check2Circle,
  ExclamationTriangle,
  HourglassSplit,
} from "react-bootstrap-icons";
import { shallowEqual, useSelector } from "react-redux";
import {
  deletePaymentRequest,
  setActionOutcome,
  toggleDeleteModal,
} from "../../redux/adminPayments/actionCreator";
import { useAppDispatch } from "../../redux/provider";

export const DeletePaymentModal = () => {
  const dispatch = useAppDispatch();
  const [isRequestsSending, setRequestSending] = useState(false);
  const {
    deleteModal: { isOpen, requestId },
    actionOutcome,
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);

  const onClose = () => {
    dispatch(toggleDeleteModal(false));
    setRequestSending(false);
    dispatch(setActionOutcome());
  };

  const onDeleteClick = () => {
    setRequestSending(true);
    requestId && dispatch(deletePaymentRequest(requestId));
  };

  const ModalFooter = () => {
    return (
      <BSGrid>
        <BSCol>
          <Button
            onClick={onClose}
            kind="primary"
            flat
            size="block"
            disabled={isRequestsSending && !actionOutcome}
          >
            Close
          </Button>
        </BSCol>
        {!actionOutcome && (
          <BSCol>
            <Button
              onClick={onDeleteClick}
              kind="primary"
              flat
              size="block"
              disabled={isRequestsSending}
            >
              Delete
            </Button>
          </BSCol>
        )}
      </BSGrid>
    );
  };

  const ProgressModalContent = () => {
    if (!actionOutcome) {
      return (
        <>
          <div className="aq-text-center">
            <Text className="aq-mb-3">
              <strong>Please don’t leave the window.</strong>
            </Text>
            <HourglassSplit />
            <Text>
              <strong>In processing...</strong>
            </Text>
          </div>
        </>
      );
    }
    if (actionOutcome === "error") {
      return (
        <div className="aq-text-center">
          <ExclamationTriangle
            size={21}
            color={aqBootstrapTheme.palette.warning}
          />
          <Text className="aq-mb-3">
            Request was not deleted because of an error.
          </Text>
        </div>
      );
    } else {
      return (
        <div className="aq-text-center">
          <Check2Circle size={21} color={aqBootstrapTheme.palette.success} />
          <Text>
            <strong>Request was deleted successfully</strong>
          </Text>
        </div>
      );
    }
  };

  return (
    <Modal
      size="small"
      isOpen={isOpen}
      onClose={onClose}
      footer={<ModalFooter />}
      closeOnClickOutside={false}
    >
      <>
        <Text className="aq-mb-3">
          <strong>Delete</strong>
        </Text>
        {isRequestsSending ? (
          <ProgressModalContent />
        ) : (
          <Text>Are you sure you want to delete request?</Text>
        )}
      </>
    </Modal>
  );
};
