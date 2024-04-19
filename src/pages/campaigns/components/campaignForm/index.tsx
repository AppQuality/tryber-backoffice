import { FormikProps } from "formik";
import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Form,
  Steps,
} from "@appquality/appquality-design-system";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import CsmSelect from "./fields/roles/CsmSelect";
import CustomerSelect from "./fields/CustomerSelect";
import CustomerTitleInput from "./fields/CustomerTitleInput";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import StartDatePicker from "./fields/dates/StartDatePicker";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";
import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";
import EndDatePicker from "./fields/dates/EndDatePicker";
import CloseDatePicker from "./fields/dates/CloseDatePicker";
import AutomaticDatesSwitch from "./fields/dates/AutomaticDatesSwitch";
import LanguageSelect from "./fields/LanguagesSelect";
import TlSelect from "./fields/roles/TLSelect";
import PmSelect from "./fields/roles/PMSelect";
import ResearcherSelect from "./fields/roles/ResearcherSelect";
import CountrySelect from "./fields/CountrySelect";
import DescriptionText from "./fields/DescriptionText";
import ProductLinkInput from "./fields/ProductLinkInput";
import GoalText from "./fields/GoalText";
import OutOfScopeText from "./fields/OutOfScopeText";
import DeviceRequirementsText from "./fields/DeviceRequirementsText";
import TargetNotesText from "./fields/TargetNotesText";
import TargetSize from "./fields/TargetSize";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
}

const CampaignForm = ({ dossier }: FormProps) => (
  <FormProvider dossier={dossier}>
    {(props: FormikProps<NewCampaignValues>) => (
      <BSGrid>
        <BSCol size="col-lg-3">
          <Card title="Sezioni del form" className="aq-mb-3">
            <Steps
              direction="vertical"
              current={4}
              clickHandler={(index, current) => {
                if (index === current) return;
              }}
            >
              <Steps.Step title="Come" />
              <Steps.Step title="Dove" />
              <Steps.Step title="Chi" />
              <Steps.Step title="Quando" />
              <Steps.Step title="ma soprattutto Perchè" />
            </Steps>
          </Card>
          <Button type="submit" size="block">
            Submit
          </Button>
        </BSCol>
        <BSCol size="col-lg-9">
          <Form id="campaign-form">
            <Card title="General info" className="aq-mb-4">
              <CustomerSelect />
              <TestTypeSelect />
              <TesterTitleInput />
              <CustomerTitleInput />
              <DescriptionText />
              <StartDatePicker />
              <EndDatePicker />
              <CloseDatePicker />
              {!props.values.isEdit && <AutomaticDatesSwitch />}
            </Card>
            <Card title="Cosa" className="aq-mb-4">
              <ProductLinkInput />
              <OutOfScopeText />
            </Card>
            <Card title="Dove" className="aq-mb-4">
              <DeviceMultiselect />
              <DeviceRequirementsText />
            </Card>
            <Card title="Chi" className="aq-mb-4">
              <CountrySelect />
              <LanguageSelect />
              <TargetNotesText />
              <TargetSize />
            </Card>
            <Card title="Come" className="aq-mb-4">
              <GoalText />
            </Card>
            <Card title="Ruoli" className="aq-mb-4">
              <CsmSelect />
              <TlSelect />
              <PmSelect />
              <ResearcherSelect />
            </Card>
          </Form>
        </BSCol>
      </BSGrid>
    )}
  </FormProvider>
);

export default CampaignForm;
