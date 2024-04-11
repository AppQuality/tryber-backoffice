import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import {
  ToastProvider,
  GlobalStyle as UnguessGlobalStyle,
} from "@appquality/unguess-design-system";
import * as Sentry from "@sentry/react";
import { ThemeProvider as UnguessThemeProvider } from "@zendeskgarden/react-theming";
import React from "react";
import TagManager from "react-gtm-module";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import { ThemeProvider } from "styled-components";
import SiteWideMessages from "./SiteWideMessages";
import { appTheme } from "./unguessTheme";

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
  Sentry.setUser({
    id: user?.id ?? 0,
    email: user?.email ?? "unknown",
    username: user?.username ?? "unknown",
    wp_user_id: user?.wp_user_id ?? 0,
    role: user?.role ?? "unknown",
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
  if (type === "unguess") {
    return (
      <UnguessThemeProvider theme={appTheme}>
        <UnguessGlobalStyle />
        <ToastProvider
          limit={5}
          zIndex={500}
          placementProps={{
            top: {
              style: {
                top:
                  parseInt(appTheme.components.chrome.header.height, 10) +
                  appTheme.space.base * 4,
              },
            },
          }}
        >
          {children}
        </ToastProvider>
      </UnguessThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <SiteWideMessages />
      {children}
    </ThemeProvider>
  );
};
