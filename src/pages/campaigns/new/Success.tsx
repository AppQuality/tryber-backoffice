import { PageTemplate } from "src/features/PageTemplate";
import { RouteComponentProps } from "react-router-dom";
import { Container, Text, Title } from "@appquality/appquality-design-system";

interface Props
  extends RouteComponentProps<{}, any, { id?: string; hookFailed?: string }> {}
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
        <div style={{ height: "100vh" }}>
          <div style={{ margin: "0 auto", paddingTop: "200px" }}>
            <div className="aq-mb-3">
              <Title size="xl">New draft submitted succesfully</Title>
              {state?.hookFailed && (
                <Title size="s" className="aq-text-warning">
                  ⚠️ but something went wrong triggering zapier web hook, please
                  check manually!
                </Title>
              )}
            </div>
            <Text className="aq-mb-4">
              Your campaign has been created with id <strong>{state.id}</strong>
            </Text>
            <Title size="ms">What's next?</Title>
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
          </div>
        </div>
      </Container>
    </PageTemplate>
  );
};

export default Success;
