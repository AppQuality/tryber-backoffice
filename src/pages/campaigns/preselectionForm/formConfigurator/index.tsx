import { useAppSelector } from "src/store";
import {
  Formik,
  Field,
  Form,
  Button,
} from "@appquality/appquality-design-system";
import * as Yup from "yup";

const initialValues: PreselectionFormValues = {
  formTitle: "",
  questions: [],
};

const validationSchema = Yup.object({
  formTitle: Yup.string().required(),
});

export const FormConfigurator = () => {
  const { selectedFields } = useAppSelector(
    (state) => state.campaignPreselection
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        alert("submitted");
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
            <div key={field.fieldData.id}>
              name:{" "}
              {typeof field.fieldData.name === "string"
                ? field.fieldData.name
                : field.fieldData.name.it}
            </div>
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
