type GeneralState = {
  messages: SiteWideMessagesState;
  adminPayments: AdminPaymentsState;
};
type AppDispatch = typeof store.dispatch;

type DispatchType = SiteWideMessagesDispatchType;
