import useUserData from "src/pages/Jotform/useUserData";
import { Container } from "@appquality/appquality-design-system";
import React from "react";

export const AuthorizedOnlyContainer: React.FC<{ excludeRule: boolean }> = ({
  children,
  excludeRule,
}) => {
  const { isFetching, isError, isLoading } = useUserData();
  if (isLoading || isFetching) return <Container>loading...</Container>;
  if (isError) return <Container>there was an error</Container>;
  if (excludeRule)
    return (
      <Container>
        You can't see this page because you are not authorized
      </Container>
    );
  return <Container>{children}</Container>;
};

export const OpsUserContainer: React.FC = ({ children }) => {
  const { data } = useUserData();
  return (
    <AuthorizedOnlyContainer
      excludeRule={data?.role === "tester" || data?.role === "subscriber"}
    >
      {children}
    </AuthorizedOnlyContainer>
  );
};
