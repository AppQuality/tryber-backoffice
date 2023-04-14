import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { MessageWrapper } from "./MessageWrapper";

const ErrorHandler = ({ error }: { error: FetchBaseQueryError }) => {
  if (error.status === 403) {
    return (
      <MessageWrapper>
        It looks like you don't have the permission to do this
      </MessageWrapper>
    );
  }
  if (error.status === 400) {
    return (
      <MessageWrapper>It looks like the campaign doesn't exist</MessageWrapper>
    );
  }
  if (error.status === 412) {
    return (
      <MessageWrapper>
        It looks like there's an edit on the old prospect
      </MessageWrapper>
    );
  }
  return (
    <MessageWrapper>There was an error loading campaign data</MessageWrapper>
  );
};

export default ErrorHandler;
