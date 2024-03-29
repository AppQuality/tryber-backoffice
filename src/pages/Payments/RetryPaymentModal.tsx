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
  paySingleFailedRequest,
  setActionOutcome,
  toggleRetryModal,
} from "../../redux/adminPayments/actionCreator";
import { useAppDispatch } from "../../redux/provider";

export const RetryPaymentModal = () => {
  const dispatch = useAppDispatch();
  const [isRequestsSending, setRequestSending] = useState(false);
  const {
    retryModal: { isOpen, requestId },
    actionOutcome,
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);

  const onClose = () => {
    dispatch(toggleRetryModal(false));
    setRequestSending(false);
    dispatch(setActionOutcome());
  };

  const onRetryClick = () => {
    setRequestSending(true);
    requestId && dispatch(paySingleFailedRequest(requestId));
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
              onClick={onRetryClick}
              kind="primary"
              flat
              size="block"
              disabled={isRequestsSending}
            >
              Pay
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
            Request was not payed because of an error, check the failed payments
            tab.
          </Text>
        </div>
      );
    } else {
      return (
        <div className="aq-text-center">
          <Check2Circle size={21} color={aqBootstrapTheme.palette.success} />
          <Text>
            <strong>Request was payed successfully</strong>
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
          <strong>Retry</strong>
        </Text>
        {isRequestsSending ? (
          <ProgressModalContent />
        ) : (
          <Text>Are you sure you want to pay request?</Text>
        )}
      </>
    </Modal>
  );
};
