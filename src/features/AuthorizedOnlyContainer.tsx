import { Container } from "@appquality/appquality-design-system";
import React from "react";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import useUserData from "src/pages/Jotform/useUserData";

export const AuthorizedOnlyContainer: React.FC<{
  excludeRule: boolean;
  children: React.ReactNode;
  isFluid?: boolean;
}> = ({ children, excludeRule, isFluid }) => {
  const { isFetching, isError, isLoading } = useUserData();
  if (isLoading || isFetching) return <Container>loading...</Container>;
  if (isError) return <Container>there was an error</Container>;
  if (excludeRule)
    return (
      <Container isFluid={isFluid}>
        <ErrorUnauthorized />
      </Container>
    );
  return <Container isFluid={isFluid}>{children}</Container>;
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
