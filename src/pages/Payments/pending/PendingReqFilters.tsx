import { Card, Checkbox } from "@appquality/appquality-design-system";
import { updatePendingRequestsFilter } from "src/redux/adminPayments/actionCreator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export const PendingReqFilters = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector(
    (state: GeneralState) => state.adminPayments.failedRequests,
    shallowEqual
  );

  const changeFilter = (filter: "all" | "pp" | "tw") => {
    dispatch(updatePendingRequestsFilter(filter));
  };

  return (
    <Card title="Filters and Status">
      <div>Payment Method</div>
      <div>
        <Checkbox
          onChange={() => changeFilter("all")}
          checked={paymentMethod === "all"}
        />
        All
      </div>
      <div>
        <Checkbox
          onChange={() => changeFilter("pp")}
          checked={paymentMethod === "pp"}
        />
        Paypal
      </div>
      <div>
        <Checkbox
          onChange={() => changeFilter("tw")}
          checked={paymentMethod === "tw"}
        />
        Trasferwise
      </div>
    </Card>
  );
};
