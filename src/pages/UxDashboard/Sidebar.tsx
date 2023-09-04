import {
  Card,
  Button,
  Text,
  Steps,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "./UxForm/FormProvider";
import {
  useGetCampaignsByCampaignUxQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  setCurrentFormSection,
  setCurrentStep,
  setIsProgrammaticallyScrolling,
} from "./uxDashboardSlice";

const Sidebar = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = siteWideMessageStore();
  const { submitForm, values, isSubmitting, setStatus, isValid } =
    useFormikContext<FormValuesInterface>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { refetch } = useGetCampaignsByCampaignUxQuery({
    campaign: id,
  });
  const { currentStep, currentFormSection } = useAppSelector(
    (state) => state.uxDashboard
  );
  const dispatch = useAppDispatch();

  const handleSaveDraft = () => {
    submitForm();
    if (!isValid) {
      add({
        type: "danger",
        message: `compila tutti i campi obbligatori`,
      });
    }
  };

  if (currentStep >= 2) return null;
  return (
    <div className="stick-to-header-lg">
      <Card title="Azioni" className="aq-mb-3">
        {currentStep === 0 && (
          <>
            <Button
              className="aq-mb-4"
              type="primary"
              flat
              size="block"
              htmlType="submit"
              data-qa="submit-draft"
              disabled={isSubmitting}
              onClick={handleSaveDraft}
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
              disabled={typeof values.status === "undefined" || isSubmitting}
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
              data-qa="publish-dashboard"
              disabled={isSubmitting}
              onClick={() => {
                saveDashboard({
                  campaign: id,
                  body: {
                    status: "publish",
                  },
                })
                  .unwrap()
                  .then((res) => {
                    setStatus("success");
                    refetch();
                  })
                  .catch((err) => {
                    setStatus("error");
                  })
                  .finally(() => {
                    dispatch(setCurrentStep(2));
                  });
              }}
            >
              Pubblica
            </Button>
          </>
        )}
      </Card>
      {currentStep === 0 && (
        <Card title="Sezioni del form" className="aq-mb-3">
          <Steps
            direction="vertical"
            current={currentFormSection}
            clickHandler={(index, current) => {
              if (index === current) return;
              dispatch(setCurrentFormSection(index));
              dispatch(setIsProgrammaticallyScrolling(true));
            }}
          >
            <Steps.Step title="Sulla Campagna" />
            <Steps.Step title="Panoramica" />
            <Steps.Step title="Nel dettaglio" />
          </Steps>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
