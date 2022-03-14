import { Card, Radio } from "@appquality/appquality-design-system";
import { updatePendingRequestsFilter } from "src/redux/adminPayments/actionCreator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export const PendingReqFilters = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector(
    (state: GeneralState) => state.adminPayments.pendingRequests,
    shallowEqual
  );

  const changeFilter = (filter: AcceptedPaymentMethod) => {
    dispatch(updatePendingRequestsFilter(filter));
  };

  return (
    <Card title="Filters and Status">
      <div>Payment Method</div>
      <div>
        <Radio
          label="all"
          id="all"
          name="all"
          onChange={() => changeFilter("all")}
          checked={paymentMethod === "all"}
        />
      </div>
      <div>
        <Radio
          label="paypal"
          id="paypal"
          name="paypal"
          onChange={() => changeFilter("paypal")}
          checked={paymentMethod === "paypal"}
        />
      </div>
      <div>
        <Radio
          label="transferwise"
          id="transferwise"
          name="transferwise"
          onChange={() => changeFilter("transferwise")}
          checked={paymentMethod === "transferwise"}
        />
      </div>
    </Card>
  );
};
