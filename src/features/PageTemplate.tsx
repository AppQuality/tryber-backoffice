import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import React from "react";
import TagManager from "react-gtm-module";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import { ThemeProvider } from "styled-components";
import SiteWideMessages from "./SiteWideMessages";

export const PageTemplate = ({
  type = "tryber",
  children,
}: {
  type?: "tryber" | "unguess";
  children: React.ReactNode;
}) => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUsersMeQuery({
    fields: "id,email,username,wp_user_id,role",
  });
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
      return (
        <div data-qa="error-not-authorized">
          You are not logged in. Please log in to continue.
        </div>
      );
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }

  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <SiteWideMessages />
      {children}
    </ThemeProvider>
  );
};
