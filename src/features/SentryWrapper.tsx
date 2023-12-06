import * as Sentry from "@sentry/react";
import isStagingEnvironment from "./isStagingEnvironment";
import { RouterHistory } from "@sentry/react/types/reactrouter";

const SentryWrapper = ({
  children,
  history,
}: {
  children: React.ReactNode;
  history: RouterHistory;
}) => {
  if (process.env.NODE_ENV !== "test") {
    Sentry.init({
      dsn: "https://4ab6d9977b0cc2ac430e8bf49522e512@o1087982.ingest.sentry.io/4506320026664960",
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
      ],
      environment: _env_.REACT_APP_ENVIRONMENT,
      // trace all staging and locale traces and 70% of production traces
      tracesSampleRate: isStagingEnvironment() ? 1.0 : 0.7,
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/dev\.tryber\.me\/api/,
        /^https:\/\/tryber\.me\/api/,
      ],
      release: _env_.REACT_APP_VERSION,
      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      // do not capture for staging and locale
      replaysSessionSampleRate: isStagingEnvironment() ? 0.0 : 0.1,
      replaysOnErrorSampleRate: isStagingEnvironment() ? 0.0 : 1.0,
    });
  }

  return <>{children}</>;
};

export default SentryWrapper;
