import { Card, PageTitle } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FormikHelpers } from "formik";
import {
  AgreementForm,
  AgreementFormValues,
} from "../components/AgreementForm";
import {
  useGetAgreementsByAgreementIdQuery,
  usePutAgreementsByAgreementIdMutation,
} from "src/services/tryberApi";
import { useHistory, useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { formatDateforAPI } from "../utils";
import { PageTemplate } from "src/features/PageTemplate";

const EditAgreementPage = () => {
  const { id } = useParams<{ id: string }>();
  const [editAgreement] = usePutAgreementsByAgreementIdMutation();
  const history = useHistory();
  const { add } = siteWideMessageStore();
  // todo: understand better which data is being fetched here
  const { currentData, isLoading, isFetching, isError, refetch } =
    useGetAgreementsByAgreementIdQuery({
      agreementId: id,
    });
  if (isLoading || isFetching) return <div>loading...</div>;
  if (isError) return <div>there was an error</div>;

  const onSubmit = async (
    values: AgreementFormValues,
    actions: FormikHelpers<AgreementFormValues>
  ) => {
    actions.setSubmitting(true);

    const res = await editAgreement({
      agreementId: id.toString(),
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
      refetch();
      history.push(`/backoffice/agreements/${res.data.id}`);
      add({ type: "success", message: "Agreement Updated" });
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
          // todo: use env vars for this (maybe to use in router and tests too)
          back={{ text: "back to list", navigation: "/backoffice/agreements" }}
        >
          Edit Agreement: {currentData?.title}
        </PageTitle>
        <Card className="aq-pb-4">
          <AgreementForm agreement={currentData} onSubmit={onSubmit} />
        </Card>
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default EditAgreementPage;
