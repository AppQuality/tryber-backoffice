import {
  BSCol,
  BSGrid,
  Formik,
  Form,
  Card,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";
import * as Yup from "yup";
import {
  PreselectionFormQuestion,
  useGetCampaignsFormsByFormIdQuery,
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
  const savedData = useGetCampaignsFormsByFormIdQuery(
    { formId: id },
    { skip: !id }
  );

  const initialFieldValue: (AdditionalField | CustomUserField)[] = [];
  savedData.data?.fields.forEach((f) => {
    switch (f.type) {
      case "gender":
      case "phone":
      case "address":
      case "text":
        initialFieldValue.push({
          fieldId: uuidv4(),
          question: f.question,
          type: f.type,
          name: "",
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
          name: "",
        });
        break;
      default:
        if (f.type.startsWith("cuf_"))
          initialFieldValue.push({
            cufId: parseInt(f.type.replace("cuf_", "")),
            cufType: f.type,
            fieldId: f.type,
            question: f.question,
            type: f.type,
            name: "",
          });
    }
  });

  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array(),
  });
  const initialValues: PreselectionFormValues = {
    formTitle: savedData.data?.name || "",
    fields: initialFieldValue || [],
  };

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
