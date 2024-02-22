import {
  aqBootstrapTheme,
  Button,
  Card,
  CSSGrid,
  Text,
} from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { resetJotform } from "src/pages/Jotform/jotformSlice";

export const JotformSuccessCard = ({ url }: { url: string }) => {
  const dispatch = useAppDispatch();
  const getFormBuilderUrl = () => {
    const editUrl = url.split("/");
    editUrl.splice(3, 0, "build");
    return editUrl.join("/");
  };
  const onCreateNewForm = () => {
    dispatch(resetJotform());
  };
  return (
    <Card title={"Jotform created with success"} className="aq-mt-4" shadow>
      <div className="aq-mb-4">
        <Text className="aq-mb-3">
          Copy and paste the following link to share the form with trybers,
          <br />
          <strong>NEVER forget</strong>
          {` the last part (testerId={Extra.crypted_id}) or
          you won't be able to associate the submission to the user`}
        </Text>
        <code
          className="aq-p-2"
          style={{ backgroundColor: aqBootstrapTheme.colors.gray100 }}
        >
          {url}
        </code>
      </div>
      <CSSGrid min="180px">
        <Button
          kind="info"
          target="_blank"
          forwardedAs="a"
          href={getFormBuilderUrl()}
          size="block"
        >
          Edit Form on Jotform
        </Button>
        <Button
          kind="info"
          target="_blank"
          forwardedAs="a"
          href={url}
          size="block"
        >
          Preview
        </Button>
        <Button kind="primary" size="block" onClick={onCreateNewForm}>
          Create new Form
        </Button>
      </CSSGrid>
    </Card>
  );
};
