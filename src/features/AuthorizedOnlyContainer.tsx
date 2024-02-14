import useUserData from "src/pages/Jotform/useUserData";
import { Container } from "@appquality/appquality-design-system";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import React from "react";

export const AuthorizedOnlyContainer: React.FC<{
  excludeRule: boolean;
  children: React.ReactNode;
}> = ({ children, excludeRule }) => {
  const { isFetching, isError, isLoading } = useUserData();
  if (isLoading || isFetching) return <Container>loading...</Container>;
  if (isError) return <Container>there was an error</Container>;
  if (excludeRule)
    return (
      <Container>
        <ErrorUnauthorized />
      </Container>
    );
  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>{children}</div>
  );
};

export const OpsUserContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useUserData();
  return (
    <AuthorizedOnlyContainer
      excludeRule={data?.role === "tester" || data?.role === "subscriber"}
    >
      {children}
    </AuthorizedOnlyContainer>
  );
};
