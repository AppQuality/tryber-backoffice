import { Button, Card, Steps } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { usePatchCampaignsByCampaignUxMutation } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  setCurrentFormSection,
  setIsProgrammaticallyScrolling,
  setPublishStatus,
} from "./uxDashboardSlice";
import { FormValuesInterface } from "./UxForm/FormProvider";

const Sidebar = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = siteWideMessageStore();
  const { submitForm, values, isSubmitting, isValid } =
    useFormikContext<FormValuesInterface>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const { currentFormSection, publishStatus } = useAppSelector(
    (state) => state.uxDashboard
  );
  const dispatch = useAppDispatch();

  const handleSaveDraft = () => {
    values.visible = 0;
    submitForm();
    if (!isValid) {
      add({
        type: "danger",
        message: `compila tutti i campi obbligatori`,
      });
    }
  };

  const handlePublish = async () => {
    dispatch(setPublishStatus("publishing"));
    debugger
    await saveDashboard({
      campaign: id,
      body: {
        visible: values.visible === 1 ? 0 : 1,
      },
    })
      .unwrap()
      .then((res) => {
        dispatch(setPublishStatus("success"));
        add({
          type: "success",
          message: `Dashboard published`,
          expire: 8,
        });
      })
      .catch((err) => {
        dispatch(setPublishStatus("failed"));
      });
  };
  return (
    <div className="stick-to-header-lg">
      <Card title="Azioni" className="aq-mb-3">
        <>
          <Button
            className="aq-mb-4"
            kind="primary"
            flat
            size="block"
            type="submit"
            data-qa="submit-draft"
            disabled={isSubmitting}
            onClick={handleSaveDraft}
          >
            Salva
          </Button>

          <Button
            type="button"
            size="block"
            kind="secondary"
            data-qa="publish-dashboard"
            disabled={
              publishStatus === "publishing" || values.visible === undefined
            }
            onClick={handlePublish}
          >
            {values.visible === 0 ? "Pubblica" : "Nascondi"}
          </Button>
        </>
      </Card>
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
    </div>
  );
};

export default Sidebar;
