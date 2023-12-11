import React from "react";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import TagManager from "react-gtm-module";
import * as Sentry from "@sentry/react";

export const PageTemplate = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUsersMeQuery({
    fields: "id, email, username, wp_user_id, role",
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  Sentry.setUser({
    id: user?.id ?? 0,
    email: user?.email ?? "unknown",
    username: user?.username ?? "unknown",
    wp_user_id: user?.wp_user_id ?? 0,
    role: user?.role ?? "unknown",
  });
  if (error) {
    if ("status" in error && error.status === 403) {
      return <div>You are not logged in. Please log in to continue.</div>;
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }
  return <>{children}</>;
};
