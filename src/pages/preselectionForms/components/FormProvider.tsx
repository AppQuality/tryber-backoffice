import {
  GetCampaignsFormsByFormIdApiResponse,
  PostCampaignsFormsApiArg,
  PreselectionFormQuestion,
  PutCampaignsFormsByFormIdApiArg,
  usePostCampaignsFormsMutation,
  usePutCampaignsFormsByFormIdMutation,
} from "src/services/tryberApi";
import { getCustomQuestionTypeLabel } from "../functions/getCustomQuestionTypeLabel";
import { getProfileTypeLabel } from "../functions/getProfileTypeLabel";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { ReactNode, useState } from "react";
import { Form, Formik } from "@appquality/appquality-design-system";
import useCufData from "../hooks/useCufData";
import { useHistory } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { scrollToFormTitle } from "../functions/scrollToFormTitle";

interface FormProviderInterface {
  savedData?: GetCampaignsFormsByFormIdApiResponse;
  isEdit: boolean;
  cufList: ApiComponents["schemas"]["CustomUserFieldsData"][];
  children: ReactNode;
}

const FormProvider = ({
  savedData,
  isEdit,
  cufList,
  children,
}: FormProviderInterface) => {
  const history = useHistory();
  const { add } = siteWideMessageStore();

  const [createForm] = usePostCampaignsFormsMutation();
  const [saveEdit, setSaveEdit] = useState(false);
  const { getAllOptions } = useCufData();
  const [editForm] = usePutCampaignsFormsByFormIdMutation();
  const initialFieldValue: (AdditionalField | CustomUserField)[] = [];
  savedData?.fields.forEach((f) => {
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
    formTitle: savedData?.name || "",
    fields: initialFieldValue,
    campaign: savedData?.campaign
      ? {
          label: savedData?.campaign.name,
          value: savedData?.campaign.id.toString(),
        }
      : { label: "", value: "" },
  };
  return (
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
        if (isEdit) {
          setSaveEdit(true);
          const args: PutCampaignsFormsByFormIdApiArg = {
            formId: savedData ? savedData?.id.toString() : "",
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
            history.push(`/backoffice/preselection-forms/${res.data.id}`);
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
            history.push(`/backoffice/preselection-forms/${res.data.id}`);
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
      <Form>{children}</Form>
    </Formik>
  );
};

export default FormProvider;
