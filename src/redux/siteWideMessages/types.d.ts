type SiteWideMessagesAddAction = {
  type: string;
  data?: SiteWideMessageItem;
};
type SiteWideMessagesRemoveAction = {
  type: string;
  data?: string;
};
type SiteWideMessagesAction =
  | SiteWideMessagesAddAction
  | SiteWideMessagesRemoveAction;

type SiteWideMessage = {
  message: ReactNode;
  type: keyof Theme["palette"];
  expire?: number | false;
};

type SiteWideMessageItem = SiteWideMessage & {
  uuid: string;
};

type SiteWideMessageAddType = SiteWideMessage;
type SiteWideMessageRemoveType = {
  uuid: string;
};
type SiteWideMessagesState = {
  messages: array<SiteWideMessageItem>;
};
type SiteWideMessagesDispatchType = (
  args: SiteWideMessagesAction | SiteWideMessagesRemoveAction
) => SiteWideMessagesAction | SiteWideMessagesRemoveAction;
