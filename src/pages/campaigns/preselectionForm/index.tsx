import {
  BSCol,
  BSGrid,
  Formik,
  Form,
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
import { CopyLinkButton } from "src/pages/campaigns/preselectionFormList/CopyLinkButton";
import { getProfileTypeLabel } from "./getProfileTypeLabel";
import { PageTemplate } from "src/features/PageTemplate";

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

  const initialFieldValue: (AdditionalField | CustomUserField)[] = [];
  savedData.data?.fields.forEach((f) => {
    switch (f.type) {
      case "gender":
      case "phone_number":
      case "address":
      case "text":
        initialFieldValue.push({
          questionId: f.id,
          fieldId: f.type,
          question: f.question,
          shortTitle: f.short_name,
          type: f.type,
          name:
            f.type === "text"
              ? `Custom ${getCustomQuestionTypeLabel(f.type)}`
              : getProfileTypeLabel(f.type),
        });
        break;
      case "radio":
      case "select":
      case "multiselect":
        initialFieldValue.push({
          questionId: f.id,
          fieldId: uuidv4(),
          question: f.question,
          shortTitle: f.short_name,
          type: f.type,
          options: f.options?.map((o) =>
            typeof o === "string" ? o : o.toString()
          ),
          name: `Custom ${getCustomQuestionTypeLabel(f.type)}`,
        });
        break;
      default:
        if (f.type.startsWith("cuf_")) {
          const cufId = parseInt(f.type.replace("cuf_", ""));
          const cufToAdd = cufList.find((cuf) => cuf.id === cufId);
          const selectedOptions: { label: string; value: string }[] = [];
          // @ts-ignore
          if (cufToAdd?.options?.length === f.options?.length) {
            selectedOptions.push({ label: "All options", value: "-1" });
          } else {
            // @ts-ignore
            f.options?.forEach((selected) => {
              const opt = cufToAdd?.options?.find((all) => all.id === selected);
              opt &&
                selectedOptions.push({
                  label: opt.name,
                  value: opt.id.toString(),
                });
            });
          }
          initialFieldValue.push({
            questionId: f.id,
            cufId,
            cufType: cufToAdd?.type,
            fieldId: f.type,
            question: f.question,
            shortTitle: f.short_name,
            type: f.type,
            name: `${cufToAdd?.name.it} - ${f.type}`,
            availableOptions: cufToAdd?.options,
            selectedOptions,
          });
        }
    }
  });

  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("This is a required field"),
        type: Yup.string().required(),
        options: Yup.array().when("type", {
          is: (type: string) =>
            type === "radio" || type === "select" || type === "multiselect",
          then: Yup.array()
            .of(Yup.string().required("This is a required field"))
            .min(2, "This field must have at least 2 items"),
        }),
      })
    ),
  });
  const initialValues: PreselectionFormValues = {
    formTitle: savedData.data?.name || "",
    fields: initialFieldValue,
    campaign: savedData.data?.campaign
      ? {
          label: savedData.data?.campaign.name,
          value: savedData.data?.campaign.id.toString(),
        }
      : { label: "", value: "" },
  };

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
        <Formik
          enableReinitialize={!saveEdit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            //refactor
            const fieldsToSend = values.fields.map((field) => {
              const newField: PreselectionFormQuestion & { id?: number } = {
                ...(field.questionId ? { id: field.questionId } : {}),
                question: field.question,
                short_name: field.shortTitle,
                type: field.type,
              };
              if (field.options) {
                // @ts-ignore
                newField.options = field.options;
              }
              if ("selectedOptions" in field && field.selectedOptions) {
                if (field.selectedOptions[0]?.value === "-1") {
                  getAllOptions(field.cufId).then((res) => {
                    newField.options = res;
                  });
                } else {
                  newField.options = field.selectedOptions.map((o) =>
                    parseInt(o.value)
                  );
                }
              }
              return newField;
            });
            if (id) {
              setSaveEdit(true);
              const args: PutCampaignsFormsByFormIdApiArg = {
                formId: id,
                body: {
                  name: values.formTitle,
                  // @ts-ignore
                  fields: fieldsToSend,
                },
              };
              if (values.campaign?.value)
                args.body.campaign = parseInt(values.campaign?.value);
              const res = await editForm(args);
              if (res && "data" in res) {
                history.push(
                  `/backoffice/campaigns/preselection-forms/${res.data.id}`
                );
                add({ type: "success", message: "Form saved" });
              } else {
                const errorCode =
                  "error" in res && "data" in res.error
                    ? (res.error.data as { code: string }).code
                    : false;
                switch (errorCode) {
                  case "CAMPAIGN_ID_ALREADY_ASSIGNED":
                    add({
                      type: "danger",
                      message: "This campaign already has a form assigned",
                    });
                    break;
                  case "NO_ACCESS_TO_CAMPAIGN":
                    add({
                      type: "danger",
                      message:
                        "You can't assign a form to a campaign you don't own",
                    });
                    break;
                  default:
                    add({
                      type: "danger",
                      message: "There was an error",
                    });
                    break;
                }
              }
            } else {
              const args: PostCampaignsFormsApiArg = {
                body: {
                  name: values.formTitle,
                  // @ts-ignore
                  fields: fieldsToSend,
                },
              };
              if (values.campaign?.value)
                args.body.campaign = parseInt(values.campaign?.value);
              const res = await createForm(args);
              if (res && "data" in res) {
                history.push(
                  `/backoffice/campaigns/preselection-forms/${res.data.id}`
                );
                add({ type: "success", message: "Form saved" });
              } else {
                const errorCode =
                  "error" in res && "data" in res.error
                    ? (res.error.data as { code: string }).code
                    : false;
                switch (errorCode) {
                  case "CAMPAIGN_ID_ALREADY_ASSIGNED":
                    add({
                      type: "danger",
                      message: "This campaign already has a form assigned",
                    });
                    break;
                  case "NO_ACCESS_TO_CAMPAIGN":
                    add({
                      type: "danger",
                      message:
                        "You can't assign a form to a campaign you don't own",
                    });
                    break;
                  default:
                    add({
                      type: "danger",
                      message: "There was an error",
                    });
                    break;
                }
              }
            }

            scrollToFormTitle();
          }}
        >
          <Form>
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
          </Form>
        </Formik>
      </OpsUserContainer>
    </PageTemplate>
  );
};

function scrollToFormTitle() {
  function scrollToFormTitle() {
    const selector = `[id="formTitle"]`;
    const formTitleElement = document.querySelector(selector) as HTMLElement;
    formTitleElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

export default PreselectionForm;
