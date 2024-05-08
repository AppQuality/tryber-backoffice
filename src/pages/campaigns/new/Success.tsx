import { PageTemplate } from "src/features/PageTemplate";
import { RouteComponentProps } from "react-router-dom";
import { Container, Text, Title } from "@appquality/appquality-design-system";
import { styled } from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

interface Props extends RouteComponentProps<{}, any, { id?: string }> {}
const Success = (props: Props) => {
  const {
    location: { state },
  } = props;

  if (typeof state?.id === "undefined") {
    props.history.push("/backoffice/campaigns/new");
    return null;
  }

  return (
    <PageTemplate>
      <Container>
        <Layout>
          <Title size="xl">New draft submitted succesfully</Title>
          <Text>
            Your campaign has been created with id <strong>{state.id}</strong>
          </Text>
          <Text>What would you like to do next?</Text>
          <Text>
            You can go back to the{" "}
            <a href={`/wp-admin/admin.php?page=mvc_campaigns`}>
              campaigns list
            </a>
          </Text>
          <Text>
            Or proceed to the{" "}
            <a
              href={`/wp-admin/admin.php?page=mvc_campaigns-edit&id=${state.id}`}
            >
              edit campaign page
            </a>
          </Text>
        </Layout>
      </Container>
    </PageTemplate>
  );
};

export default Success;
