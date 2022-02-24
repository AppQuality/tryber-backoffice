import { Button, Modal } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import {
  paySelectedRequests,
  togglePaymentModal,
} from "src/redux/adminPayments/actionCreator";

export const MakePaymentModal = () => {
  const {
    paymentModal: { isOpen },
    pendingRequests: { selected },
  } = useSelector((state: GeneralState) => state.adminPayments, shallowEqual);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(togglePaymentModal(false));
  };

  const onPayClick = () => {
    dispatch(paySelectedRequests("pending"));
  };

  const ModalFooter = () => {
    return (
      <Button onClick={onPayClick} type="primary" size="block" flat>
        Pay
      </Button>
    );
  };
  return (
    <Modal
      size="small"
      isOpen={isOpen}
      onClose={onClose}
      title="Pay"
      footer={<ModalFooter />}
    >
      Are you sure you want to pay {selected.length} request(s)?
    </Modal>
  );
};