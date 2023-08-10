import { Card, Button, Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "./UxForm/FormProvider";
import { usePatchCampaignsByCampaignUxMutation } from "src/services/tryberApi";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { useAppDispatch, useAppSelector } from "src/store";
import { setCurrentStep } from "./uxDashboardSlice";

const Sidebar = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = siteWideMessageStore();
  const { submitForm, values } = useFormikContext<FormValuesInterface>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { currentStep } = useAppSelector((state) => state.uxDashboard);
  const dispatch = useAppDispatch();
  return (
    <>
      <Card title="actions" className="aq-mb-3">
        {currentStep === 0 && (
          <>
            <Button
              className="aq-mb-4"
              type="primary"
              flat
              size="block"
              htmlType="submit"
              data-qa="submit-draft"
              onClick={() => submitForm()}
            >
              Save Draft
            </Button>
            <Text className="aq-mb-2">
              Per pubblicare passa prima dalla preview
            </Text>
            <Button
              htmlType="button"
              size="block"
              type="secondary"
              data-qa="open-dashboard-preview"
              onClick={() => dispatch(setCurrentStep(1))}
              disabled={typeof values.status === "undefined"}
            >
              Preview
            </Button>
          </>
        )}
        {currentStep === 1 && (
          <>
            <Button
              className="aq-mb-4"
              type="primary"
              flat
              size="block"
              data-qa="close-dashboard-preview"
              onClick={() => dispatch(setCurrentStep(0))}
            >
              Torna alle modifiche
            </Button>
            <Text className="aq-mb-2">
              Pubblica per rendere disponibile la dashboard anche al cliente
            </Text>
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
                dispatch(setCurrentStep(2));
              }}
            >
              Pubblica
            </Button>
          </>
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