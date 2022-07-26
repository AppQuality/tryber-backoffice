import { Button, Card, Title } from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { resetJotform } from "src/pages/Jotform/jotformSlice";

export const JotformSuccessCard = ({ url }: { url: string }) => {
  const dispatch = useAppDispatch();
  const getFormBuilderUrl = () => {
    // https://eu.jotform.com/222063718431349?testerId={Profile.id}
    // https://eu.jotform.com/build/222063777788369
    const editUrl = url.split("/");
    editUrl.splice(3, 0, "build");
    return editUrl.join("/");
  };
  const onCreateNewForm = () => {
    dispatch(resetJotform());
  };
  return (
    <Card title={"Jotform created with success"} className="aq-mb-3" shadow>
      <Title size="m" className="aq-mb-3">
        {url}
      </Title>
      <Button
        className="aq-mr-3"
        type="info"
        target="_blank"
        forwardedAs="a"
        href={getFormBuilderUrl()}
        size="lg"
      >
        Edit Form on Jotform
      </Button>
      <Button
        className="aq-mr-3"
        type="info"
        variant
        target="_blank"
        forwardedAs="a"
        href={url}
        size="lg"
      >
        Preview
      </Button>
      <Button type="primary" size="lg" onClick={onCreateNewForm}>
        Create a new Form
      </Button>
    </Card>
  );
};
