import { useAppSelector } from "src/store";
import {
  Formik,
  Field,
  Form,
  Button,
} from "@appquality/appquality-design-system";
import * as Yup from "yup";
import { FieldConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator/FieldConfigurator";

const initialValues: PreselectionFormValues = {
  formTitle: "",
  questions: {},
};

export const FormConfigurator = () => {
  const { selectedFields } = useAppSelector(
    (state) => state.campaignPreselection
  );

  selectedFields.forEach((f) => {
    initialValues.questions[f.fieldData.id] = {
      fieldId: f.fieldData.id,
      title: "",
      type: f.fieldData.type,
      ...("options" in f.fieldData && f.fieldData.options
        ? { options: [] }
        : undefined),
    };
  });

  const validationSchema = Yup.object({
    formTitle: Yup.string().required(),
    questions: Yup.object(),
  });

  return (
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
        <Field
          name="formTitle"
          type="text"
          placeholder="e.g. CP-3887 Preselection Form"
          label={"Form Title"}
        />
        <div>
          {selectedFields.map((field) => (
            <FieldConfigurator
              key={`configurator-${field.fieldData.id}`}
              field={field}
            />
          ))}
        </div>
        <Button htmlType="submit" type="primary">
          Save
        </Button>{" "}
        <Button htmlType="reset" type="danger" variant>
          Reset
        </Button>{" "}
        <Button variant flat>
          Preview
        </Button>
      </Form>
    </Formik>
  );
};
