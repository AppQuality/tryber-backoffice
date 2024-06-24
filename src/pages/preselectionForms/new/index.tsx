import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";
import * as Yup from "yup";
import {
  PostCampaignsFormsApiArg,
  PreselectionFormQuestion,
  PutCampaignsFormsByFormIdApiArg,
  useGetCampaignsFormsByFormIdQuery,
  useGetCustomUserFieldsQuery,
  usePostCampaignsFormsMutation,
  usePutCampaignsFormsByFormIdMutation,
} from "src/services/tryberApi";
import useCufData from "src/pages/campaigns/preselectionForm/useCufData";
import { useAppDispatch } from "src/store";
import siteWideMessageStore from "src/redux/siteWideMessages";

import { setLoadedForm } from "./preselectionSlice";
import { v4 as uuidv4 } from "uuid";
import { getCustomQuestionTypeLabel } from "./getCustomQuestionTypeLabel";
import { CopyLinkButton } from "src/pages/preselectionForms/CopyLinkButton";
import { getProfileTypeLabel } from "./getProfileTypeLabel";
import { PageTemplate } from "src/features/PageTemplate";
import FormProvider from "src/pages/preselectionForms/components/FormProvider";

const PreselectionForm = () => {
  const history = useHistory();
  const { add } = siteWideMessageStore();

  const [createForm] = usePostCampaignsFormsMutation();
  const [editForm] = usePutCampaignsFormsByFormIdMutation();
  const { getAllOptions } = useCufData();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data } = useGetCustomUserFieldsQuery();
  const savedData = useGetCampaignsFormsByFormIdQuery(
    { formId: id },
    { skip: !id }
  );
  const [cufList, setCufList] = useState<
    ApiComponents["schemas"]["CustomUserFieldsData"][]
  >([]);
  const [saveEdit, setSaveEdit] = useState(false);

  useEffect(() => {
    const list: ApiComponents["schemas"]["CustomUserFieldsData"][] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [data]);

  useEffect(() => {
    if (savedData?.data) {
      dispatch(setLoadedForm(savedData.data));
    }
  }, [savedData]);
  return (
    <PageTemplate>
      <OpsUserContainer>
        <PageTitle
          size="regular"
          back={{
            text: "Back to list",
            navigation: "/backoffice/campaigns/preselection-forms",
          }}
        >
          <span>{id ? "Edit Preselection Form" : "New Preselection Form"}</span>
          <CopyLinkButton id={id} />
        </PageTitle>
        <FormProvider>
          <BSGrid className="aq-my-4">
            <BSCol size="col-lg-4">
              <FieldsSelectors />
            </BSCol>
            <BSCol size="col-lg-8">
              {savedData.isLoading || savedData.isFetching ? (
                <Card>...loading</Card>
              ) : savedData.error || (id && !savedData.data) ? (
                <Card>...error retrieving form</Card>
              ) : (
                <FormConfigurator />
              )}
            </BSCol>
          </BSGrid>
        </FormProvider>
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default PreselectionForm;
