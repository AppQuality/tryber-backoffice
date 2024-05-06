import { PageTemplate } from "src/features/PageTemplate";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Container,
  PageTitle,
  Text,
} from "@appquality/appquality-design-system";
import { styled } from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface Props extends RouteComponentProps<{}, any, { id?: string }> {}
const Success = (props: Props) => {
  const {
    location: { state },
  } = props;

  const backToList = () => {
    window.parent.postMessage(
      JSON.stringify({
        type: "go-to-campaigns-list",
      }),
      "*"
    );
  };

  const goToEdit = () => {
    window.parent.postMessage(
      JSON.stringify({
        type: "go-to-edit",
        id: state.id,
      }),
      "*"
    );
  };

  if (typeof state?.id === "undefined") {
    props.history.push("/backoffice/campaigns/new");
    return null;
  }

  return (
    <PageTemplate>
      <Container>
        <PageTitle
          back={{
            text: "Create a new campaign",
            navigation: "/backoffice/campaigns/new",
          }}
        >
          Campaign created
        </PageTitle>
        <Layout>
          <Text>Your campaign has been created with id {state.id}</Text>
          <Text className="aq-mb-3">What would you like to do next?</Text>
          <div>
            <Button onClick={backToList} flat className="aq-mr-3">
              Go back to campaigns list
            </Button>
            <Button onClick={goToEdit}>Go to edit campaigns details</Button>
          </div>
        </Layout>
      </Container>
    </PageTemplate>
  );
};

export default Success;
