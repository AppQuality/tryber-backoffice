import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import {
  AgreementForm,
  AgreementFormValues,
} from "../components/AgreementForm";
import { Card, PageTitle } from "@appquality/appquality-design-system";
import { usePostAgreementsMutation } from "src/services/tryberApi";
import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { formatDateforAPI } from "../utils";
import { PageTemplate } from "src/features/PageTemplate";

const NewAgreementPage = () => {
  const [newAgreement] = usePostAgreementsMutation();
  const history = useHistory();
  const { add } = siteWideMessageStore();
  const onSubmit = async (
    values: AgreementFormValues,
    actions: FormikHelpers<AgreementFormValues>
  ) => {
    actions.setSubmitting(true);
    const res = await newAgreement({
      body: {
        title: values.title,
        tokens: values.tokens,
        unitPrice: values.tokenUnitPrice,
        startDate: formatDateforAPI(values.startDate),
        expirationDate: formatDateforAPI(values.expirationDate),
        isTokenBased: values.isTokenBased,
        note: values.note,
        customerId: parseInt(values.customer),
      },
    });
    if (res && "data" in res) {
      history.push(`/backoffice/agreements/${res.data.agreementId}`);
      add({ type: "success", message: "New Agreement Saved" });
      return;
    }
    add({
      type: "danger",
      message: "There was an error",
    });
    return;
  };
  return (
    <PageTemplate>
      <OpsUserContainer>
        <PageTitle
          back={{ text: "back to list", navigation: "/backoffice/agreements" }}
        >
          New Agreement
        </PageTitle>
        <Card className="aq-pb-4">
          <AgreementForm onSubmit={onSubmit} />
        </Card>
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default NewAgreementPage;
