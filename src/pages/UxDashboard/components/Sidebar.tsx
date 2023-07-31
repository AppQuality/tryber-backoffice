import {
  Card,
  Button,
  Steps,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "../UxForm/FormProvider";
import { usePatchCampaignsByCampaignUxMutation } from "src/services/tryberApi";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";

const Sidebar = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const { add } = siteWideMessageStore();
  const { submitForm, values } = useFormikContext<FormValuesInterface>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
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
            onClick={() => {
              const res = saveDashboard({
                campaign: id,
                body: {
                  status: "publish",
                },
              });
              if ("error" in res) {
                add({
                  type: "danger",
                  message: `something went wrong`,
                });
                return;
              }
              setStep(2);
            }}
          >
            Publish
          </Button>
        )}
      </Card>
      {/* {step === 0 && (
        <Card title="Sezioni del form" className="aq-mb-3">
          <Steps direction="vertical" current={0}>
            <Steps.Step title="Sulla Campagna" />
            <Steps.Step title="Panoramica" />
            <Steps.Step title="Nel dettaglio" />
          </Steps>
        </Card>
      )} */}
    </>
  );
};

export default Sidebar;
