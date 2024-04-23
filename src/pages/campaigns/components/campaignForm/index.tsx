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
import AutomaticDatesSwitch from "./fields/dates/AutomaticDatesSwitch";
import CloseDatePicker from "./fields/dates/CloseDatePicker";
import EndDatePicker from "./fields/dates/EndDatePicker";
import StartDatePicker from "./fields/dates/StartDatePicker";
import CsmSelect from "./fields/roles/CsmSelect";
import PmSelect from "./fields/roles/PMSelect";
import ResearcherSelect from "./fields/roles/ResearcherSelect";
import TlSelect from "./fields/roles/TLSelect";
import { styled } from "styled-components";
import InputField from "./fields/components/InputField";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
  isEdit?: boolean;
}
const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 0;
  }
`;

const ResponsiveCol = styled(BSCol)<{ lgOrder: number }>`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
    order: ${({ lgOrder }) => lgOrder};
  }
`;

const CampaignForm = ({ dossier, isEdit }: FormProps) => {
  return (
    <CampaignFormContext>
      <FormProvider dossier={dossier} isEdit={isEdit}>
        <BSGrid>
          <ResponsiveCol size="col-lg-3" lgOrder={1}>
            <StickyContainer>
              <Card title="Sezioni del form" className="aq-mb-3">
                <Stepper />
              </Card>
              <Button type="submit" size="block">
                Submit
              </Button>
            </StickyContainer>
          </ResponsiveCol>
          <ResponsiveCol size="col-lg-9" lgOrder={2}>
            <Form id="campaign-form">
              <Section title="General info" id="general">
                <CustomerSelect />
                <TestTypeSelect />
                <InputField
                  name="testerTitle"
                  label="Campaign Title (for tester)"
                />
                <InputField
                  name="customerTitle"
                  label="Campaign Title (for customer)"
                />
                <DescriptionText />
                <StartDatePicker />
                <EndDatePicker />
                <CloseDatePicker />
                {!isEdit && <AutomaticDatesSwitch />}
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
          </ResponsiveCol>
        </BSGrid>
      </FormProvider>
    </CampaignFormContext>
  );
};

export default CampaignForm;
