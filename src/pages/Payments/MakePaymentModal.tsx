import {
  Button,
  Modal,
  BSGrid,
  BSCol,
  Text,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import {
  Check2Circle,
  ExclamationTriangle,
  HourglassSplit,
} from "react-bootstrap-icons";
import {
  payMultiplePendingRequests,
  togglePaymentModal,
  stopMultipaymentProcess,
} from "src/redux/adminPayments/actionCreator";
import { useState } from "react";

export const MakePaymentModal = () => {
  const [isRequestsSending, setRequestSending] = useState(false);
  const {
    paymentModal: { isOpen },
    pendingRequests: { selected, processing },
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(togglePaymentModal(false));
    setRequestSending(false);
  };

  const cancelPayments = () => {
    dispatch(stopMultipaymentProcess());
  };

  const onPayClick = async () => {
    setRequestSending(true);
    dispatch(payMultiplePendingRequests());
  };

  const InitialModalFooter = () => {
    return (
      <BSGrid>
        <BSCol>
          <Button
            onClick={onClose}
            type="primary"
            flat
            size="block"
            disabled={isRequestsSending}
          >
            Close
          </Button>
        </BSCol>
        <BSCol>
          <Button onClick={onPayClick} type="primary" flat size="block">
            Pay
          </Button>
        </BSCol>
      </BSGrid>
    );
  };

  const ProgressModalFooter = () => {
    return (
      <>
        {processing.status === "finished" ? (
          <Button onClick={onClose} type="primary" flat size="block">
            Close
          </Button>
        ) : (
          <Button
            onClick={cancelPayments}
            type="danger"
            flat
            size="block"
            disabled={processing.abort}
          >
            {processing.abort ? "...cancelling process" : "Stop"}
          </Button>
        )}
      </>
    );
  };

  const ProgressModalContent = () => {
    const success = processing.items.filter(
      (p) => p.status === "success"
    ).length;
    const errors = processing.items.filter((p) => p.status === "error").length;
    const pending = processing.items.filter(
      (p) => p.status === "pending"
    ).length;
    return (
      <>
        {processing.status === "finished" ? (
          <div className="aq-text-center">
            {errors > 0 ? (
              <>
                <ExclamationTriangle
                  size={21}
                  color={aqBootstrapTheme.palette.warning}
                />
                <Text className="aq-mb-3">
                  <strong>Some payment didn't go through</strong>
                </Text>
                <Text>
                  <strong>
                    {errors}/{processing.items.length}
                  </strong>{" "}
                  requests were not payed because of an error, check the failed
                  payments tab.
                </Text>
              </>
            ) : (
              <>
                <Check2Circle
                  size={21}
                  color={aqBootstrapTheme.palette.success}
                />
                <Text>
                  <strong>
                    {success}/{processing.items.length} requests were payed
                    successfully
                  </strong>
                </Text>
              </>
            )}
            {pending > 0 && (
              <Text>
                <strong>{pending}</strong> payment requests were manually
                interrupted, you'll still find them in the pending payments tab
              </Text>
            )}
          </div>
        ) : (
          <>
            <Text className="aq-mb-3">
              <strong>Please don’t leave the window.</strong>
            </Text>
            <div className="aq-text-center">
              <HourglassSplit />
              <Text>
                <strong>{processing.status}</strong>
              </Text>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Modal
      size="small"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        isRequestsSending ? <ProgressModalFooter /> : <InitialModalFooter />
      }
      closeOnClickOutside={false}
    >
      <>
        <Text className="aq-mb-3">
          <strong>Pay</strong>
        </Text>
        {isRequestsSending ? (
          <ProgressModalContent />
        ) : (
          <Text>
            Are you sure you want to pay{" "}
            <strong>{selected.size} request(s)?</strong>
          </Text>
        )}
      </>
    </Modal>
  );
};
