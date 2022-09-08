import {
  BSCol,
  BSGrid,
  Formik,
  Form,
  Card,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";
import * as Yup from "yup";
import {
  PreselectionFormQuestion,
  useGetCampaignsFormsByFormIdQuery,
  useGetCustomUserFieldsQuery,
  usePostCampaignsFormsMutation,
} from "src/services/tryberApi";
import useCufData from "src/pages/campaigns/preselectionForm/useCufData";
import { useAppDispatch } from "src/store";
import { setLoadedForm } from "./preselectionSlice";
import { v4 as uuidv4 } from "uuid";

function PreselectionForm() {
  const [createForm] = usePostCampaignsFormsMutation();
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

  const initialFieldValue: (AdditionalField | CustomUserField)[] = [];
  savedData.data?.fields.forEach((f) => {
    switch (f.type) {
      case "gender":
      case "phone":
      case "address":
      case "text":
        initialFieldValue.push({
          fieldId: f.type,
          question: f.question,
          type: f.type,
          name: f.type,
        });
        break;
      case "radio":
      case "select":
      case "multiselect":
        initialFieldValue.push({
          fieldId: uuidv4(),
          question: f.question,
          type: f.type,
          options: f.options?.map((o) =>
            typeof o === "string" ? o : o.toString()
          ),
          name: f.type,
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
            cufId,
            cufType: cufToAdd?.type,
            fieldId: f.type,
            question: f.question,
            type: f.type,
            name: cufToAdd?.name.it || f.type,
            availableOptions: cufToAdd?.options,
            selectedOptions,
          });
        }
    }
  });

  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array(),
  });
  const initialValues: PreselectionFormValues = {
    formTitle: savedData.data?.name || "",
    fields: initialFieldValue,
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
    <OpsUserContainer>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const fieldsToSend = values.fields.map((field) => {
            const newField: PreselectionFormQuestion = {
              question: field.question,
              type: field.type,
            };
            if (field.options) {
              // @ts-ignore
              newField.options = field.options;
            }
            if ("selectedOptions" in field && field.selectedOptions) {
              if (field.selectedOptions[0].value === "-1") {
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
          const res = await createForm({
            body: {
              name: values.formTitle,
              // @ts-ignore
              fields: fieldsToSend,
            },
          });
          console.log(res);
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
  );
}

export default PreselectionForm;
