import {
  BSCol,
  BSGrid,
  Formik,
  Form,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";
import * as Yup from "yup";
import {
  PreselectionFormQuestion,
  usePostCampaignsFormsMutation,
} from "src/services/tryberApi";
import useCufData from "src/pages/campaigns/preselectionForm/useCufData";

const PreselectionForm = () => {
  const [createForm] = usePostCampaignsFormsMutation();
  const { getAllOptions } = useCufData();
  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required(),
        type: Yup.string().required(),
        options: Yup.array().when("type", {
          is: (type: string) =>
            type === "radio" || type === "select" || type === "multiselect",
          then: Yup.array().of(Yup.string().required()).min(2),
        }),
      })
    ),
  });
  const initialValues: PreselectionFormValues = {
    formTitle: "",
    fields: [],
  };
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
          // @ts-ignore
          alert("form submitted con id: " + res.data.id);
        }}
      >
        <Form>
          <BSGrid className="aq-my-4">
            <BSCol size="col-lg-4">
              <FieldsSelectors />
            </BSCol>
            <BSCol size="col-lg-8">
              <FormConfigurator />
            </BSCol>
          </BSGrid>
        </Form>
      </Formik>
    </OpsUserContainer>
  );
};

export default PreselectionForm;
