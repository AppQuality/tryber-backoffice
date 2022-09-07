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
import { useGetCampaignsFormsByFormIdQuery } from "../../../services/tryberApi";
import { useAppDispatch } from "src/store";
import { setLoadedForm } from "./preselectionSlice";
import { v4 as uuidv4 } from "uuid";

function PreselectionForm() {
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
        onSubmit={(values) => {
          alert("submitted");
          console.log(values);
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
