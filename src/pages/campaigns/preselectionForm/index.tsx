import {
  BSCol,
  BSGrid,
  Formik,
  Form,
  Card,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";
import * as Yup from "yup";
import {
  useGetCampaignsFormsByFormIdQuery,
  useGetCustomUserFieldsQuery,
} from "../../../services/tryberApi";
import { useEffect } from "react";

function PreselectionForm() {
  const { id } = useParams<{ id: string }>();
  const savedData = useGetCampaignsFormsByFormIdQuery(
    { formId: id },
    { skip: !id }
  );

  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    fields: Yup.array(),
  });
  const initialValues: PreselectionFormValues = {
    formTitle: savedData.data?.name || "",
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
