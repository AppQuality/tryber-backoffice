import {
  Card,
  Button,
  Steps,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "../UxForm/FormProvider";

const Sidebar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) => {
  const { errors, submitForm, values } =
    useFormikContext<FormValuesInterface>();
  return (
    <>
      <Card title="actions" className="aq-mb-3">
        {step === 0 && (
          <>
            <Button
              className="aq-mb-1"
              type="primary"
              flat
              size="block"
              htmlType="submit"
              data-qa="submit-draft"
              onClick={() => submitForm()}
            >
              Save Draft
            </Button>
            <Text small className="aq-mb-3">
              {errors && errors.insights && JSON.stringify(errors)}
            </Text>
          </>
        )}
        {step === 1 && (
          <Button
            className="aq-mb-3"
            type="primary"
            flat
            size="block"
            data-qa="close-dashboard-preview"
            onClick={() => setStep(0)}
          >
            Back to Form
          </Button>
        )}
        {step === 0 && (
          <>
            <Button
              className="aq-mb-1"
              htmlType="button"
              size="block"
              type="secondary"
              data-qa="open-dashboard-preview"
              onClick={() => setStep(1)}
              disabled={typeof values.status === "undefined"}
            >
              Preview
            </Button>
            <Text small className="aq-mb-3">
              {values.status}
              Per <strong>pubblicare</strong> passa prima dalla preview
            </Text>
          </>
        )}
        {step === 1 && (
          <Button
            htmlType="button"
            size="block"
            type="secondary"
            data-qa="close-dashboard-preview"
            onClick={() => setStep(2)}
          >
            Publish
          </Button>
        )}
      </Card>
      {step === 0 && (
        <Card title="Sezioni del form" className="aq-mb-3">
          <Steps direction="vertical" current={0}>
            <Steps.Step title="Sulla Campagna" />
            <Steps.Step title="Panoramica" />
            <Steps.Step title="Nel dettaglio" />
          </Steps>
        </Card>
      )}
    </>
  );
};

export default Sidebar;
