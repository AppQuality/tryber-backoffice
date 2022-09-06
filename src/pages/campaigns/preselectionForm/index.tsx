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

function preselectionForm() {
  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array(),
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
              <FormConfigurator />
            </BSCol>
          </BSGrid>
        </Form>
      </Formik>
    </OpsUserContainer>
  );
}

export default preselectionForm;
