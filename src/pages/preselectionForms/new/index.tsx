import { BSCol, BSGrid, PageTitle } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/preselectionForms/components/fieldsSelectors";
import { FormConfigurator } from "src/pages/preselectionForms/components/formConfigurator";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";

import { CopyLinkButton } from "src/pages/preselectionForms/components/CopyLinkButton";
import { PageTemplate } from "src/features/PageTemplate";
import FormProvider from "src/pages/preselectionForms/components/FormProvider";

const PreselectionForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCustomUserFieldsQuery();
  const [cufList, setCufList] = useState<
    ApiComponents["schemas"]["CustomUserFieldsData"][]
  >([]);

  useEffect(() => {
    const list: ApiComponents["schemas"]["CustomUserFieldsData"][] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [data]);

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
        <FormProvider isEdit={false} cufList={cufList}>
          <BSGrid className="aq-my-4">
            <BSCol size="col-lg-4">
              <FieldsSelectors />
            </BSCol>
            <BSCol size="col-lg-8">
              <FormConfigurator />
            </BSCol>
          </BSGrid>
        </FormProvider>
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default PreselectionForm;
