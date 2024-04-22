import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Form,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import { Section } from "./Section";
import { Stepper } from "./Stepper";
import { CampaignFormContext } from "./campaignFormContext";
import CountrySelect from "./fields/CountrySelect";
import CustomerSelect from "./fields/CustomerSelect";
import CustomerTitleInput from "./fields/CustomerTitleInput";
import DescriptionText from "./fields/DescriptionText";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import DeviceRequirementsText from "./fields/DeviceRequirementsText";
import GoalText from "./fields/GoalText";
import LanguageSelect from "./fields/LanguagesSelect";
import OutOfScopeText from "./fields/OutOfScopeText";
import ProductLinkInput from "./fields/ProductLinkInput";
import TargetNotesText from "./fields/TargetNotesText";
import TargetSize from "./fields/TargetSize";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";
import AutomaticDatesSwitch from "./fields/dates/AutomaticDatesSwitch";
import CloseDatePicker from "./fields/dates/CloseDatePicker";
import EndDatePicker from "./fields/dates/EndDatePicker";
import StartDatePicker from "./fields/dates/StartDatePicker";
import CsmSelect from "./fields/roles/CsmSelect";
import PmSelect from "./fields/roles/PMSelect";
import ResearcherSelect from "./fields/roles/ResearcherSelect";
import TlSelect from "./fields/roles/TLSelect";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
}

const CampaignForm = ({ dossier }: FormProps) => {
  return (
    <CampaignFormContext>
      <FormProvider dossier={dossier}>
        {(props: FormikProps<NewCampaignValues>) => (
          <BSGrid>
            <BSCol size="col-lg-3">
              <Card title="Sezioni del form" className="aq-mb-3">
                <Stepper />
              </Card>
              <Button type="submit" size="block">
                Submit
              </Button>
            </BSCol>
            <BSCol size="col-lg-9">
              <Form id="campaign-form">
                <Section title="General info" id="general">
                  <CustomerSelect />
                  <TestTypeSelect />
                  <TesterTitleInput />
                  <CustomerTitleInput />
                  <DescriptionText />
                  <StartDatePicker />
                  <EndDatePicker />
                  <CloseDatePicker />
                  {!props.values.isEdit && <AutomaticDatesSwitch />}
                </Section>
                <Section title="Cosa" id="what">
                  <ProductLinkInput />
                  <OutOfScopeText />
                </Section>
                <Section title="Dove" id="when">
                  <DeviceMultiselect />
                  <DeviceRequirementsText />
                </Section>
                <Section title="Chi" id="who">
                  <CountrySelect />
                  <LanguageSelect />
                  <TargetNotesText />
                  <TargetSize />
                </Section>
                <Section title="Come" id="how">
                  <GoalText />
                </Section>
                <Section title="Ruoli" id="roles">
                  <CsmSelect />
                  <TlSelect />
                  <PmSelect />
                  <ResearcherSelect />
                </Section>
              </Form>
            </BSCol>
          </BSGrid>
        )}
      </FormProvider>
    </CampaignFormContext>
  );
};

export default CampaignForm;
