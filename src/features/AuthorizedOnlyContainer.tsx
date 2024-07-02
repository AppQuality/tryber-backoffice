import { Container } from "@appquality/appquality-design-system";
import React from "react";
import ErrorUnauthorized from "src/features/ErrorUnauthorized/ErrorUnauthorized";
import { useGetUsersMeQuery } from "src/services/tryberApi";

export const AuthorizedOnlyContainer: React.FC<{
  excludeRule: boolean;
  children: React.ReactNode;
  isFluid?: boolean;
}> = ({ children, excludeRule, isFluid }) => {
  const { isError, isFetching, isLoading } = useGetUsersMeQuery({
    fields: "role",
  });
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
  const { data } = useGetUsersMeQuery({
    fields: "role",
  });
  return (
    <AuthorizedOnlyContainer
      excludeRule={data?.role === "tester" || data?.role === "subscriber"}
    >
      {children}
    </AuthorizedOnlyContainer>
  );
};
