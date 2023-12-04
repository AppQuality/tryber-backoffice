import React from "react";
import SentryWrapper from "./SentryWrapper";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import TagManager from "react-gtm-module";

export const PageTemplate = ({ children }: { children: React.ReactNode }) => {
  const { error, isLoading } = useGetUsersMeQuery({});
  if (isLoading) {
    return <div>Loading...</div>;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error) {
    if ("status" in error && error.status === 403) {
      return <div>You are not logged in. Please log in to continue.</div>;
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }
  return <SentryWrapper>{children}</SentryWrapper>;
};
