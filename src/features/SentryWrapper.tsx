import { useGetUsersMeQuery } from "src/services/tryberApi";
import * as Sentry from "@sentry/react";

const SentryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useGetUsersMeQuery({});

  Sentry.setUser({
    role: user?.role ?? "unknown",
    wp_user_id: user?.wp_user_id ?? 0,
    tester_id: user?.id ?? 0,
  });

  return <>{children}</>;
};

export default SentryWrapper;
