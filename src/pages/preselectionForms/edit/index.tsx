import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/preselectionForms/components/fieldsSelectors";
import { FormConfigurator } from "src/pages/preselectionForms/components/formConfigurator";

import {
  useGetCampaignsFormsByFormIdQuery,
  useGetCustomUserFieldsQuery,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";

import { setLoadedForm } from "src/pages/preselectionForms/singleSlice";
import { CopyLinkButton } from "src/pages/preselectionForms/components/CopyLinkButton";
import { PageTemplate } from "src/features/PageTemplate";
import FormProvider from "src/pages/preselectionForms/components/FormProvider";

const PreselectionForm = () => {
  const dispatch = useAppDispatch();
  const [cufList, setCufList] = useState<
    ApiComponents["schemas"]["CustomUserFieldsData"][]
  >([]);
  const { data: cufData } = useGetCustomUserFieldsQuery();
  const { id } = useParams<{ id: string }>();
  const {
    data: formData,
    isLoading,
    isError,
    isFetching,
  } = useGetCampaignsFormsByFormIdQuery({ formId: id }, { skip: !id });

  useEffect(() => {
    const list: ApiComponents["schemas"]["CustomUserFieldsData"][] = [];
    cufData?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [cufData]);

  useEffect(() => {
    if (formData) {
      dispatch(setLoadedForm(formData));
    }
  }, [dispatch, formData]);
  return (
    <PageTemplate>
      <OpsUserContainer>
        <PageTitle
          size="regular"
          back={{
            text: "Back to list",
            navigation: "/backoffice/preselection-forms",
          }}
        >
          <span>{id ? "Edit Preselection Form" : "New Preselection Form"}</span>
          <CopyLinkButton id={id} />
        </PageTitle>
        {isLoading || isFetching || typeof formData === "undefined" ? (
          <Card>...loading</Card>
        ) : isError ? (
          <Card>...error retrieving form</Card>
        ) : (
          <FormProvider savedData={formData} cufList={cufList} isEdit>
            <BSGrid className="aq-my-4">
              <BSCol size="col-lg-4">
                <FieldsSelectors />
              </BSCol>
              <BSCol size="col-lg-8">
                <FormConfigurator />
              </BSCol>
            </BSGrid>
          </FormProvider>
        )}
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default PreselectionForm;
