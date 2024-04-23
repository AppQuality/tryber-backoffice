import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Form,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import {
  GetDossiersByCampaignApiResponse,
  PostDossiersApiArg,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import FormProvider from "./FormProvider";
import { Section } from "./Section";
import { Stepper } from "./Stepper";
import { CampaignFormContext } from "./campaignFormContext";
import CountrySelect from "./fields/CountrySelect";
import CustomerSelect from "./fields/CustomerSelect";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import InputField from "./fields/InputField";
import LanguageSelect from "./fields/LanguagesSelect";
import TestTypeSelect from "./fields/TestTypeSelect";
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
  isEdit?: boolean;
  duplicate?: PostDossiersApiArg["body"]["duplicate"];
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

const Submit = () => {
  const { submitForm } = useFormikContext();
  return (
    <Button type="submit" size="block" onClick={() => submitForm}>
      Submit
    </Button>
  );
};
const CampaignForm = ({ dossier, isEdit, duplicate }: FormProps) => {
  return (
    <CampaignFormContext>
      <FormProvider dossier={dossier} isEdit={isEdit} duplicate={duplicate}>
        <BSGrid>
          <ResponsiveCol size="col-lg-3" lgOrder={1}>
            <StickyContainer>
              <Card title="Sezioni del form" className="aq-mb-3">
                <Stepper />
              </Card>
              <Submit />
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
                <TextareaField name="description" label="Description" />
                <StartDatePicker />
                <EndDatePicker />
                <CloseDatePicker />
                {!isEdit && <AutomaticDatesSwitch />}
              </Section>
              <Section title="Cosa" id="what">
                <InputField
                  type="url"
                  name="productLink"
                  label="Product Link"
                />
                <TextareaField name="outOfScope" label="Out of scope" />
              </Section>
              <Section title="Dove" id="when">
                <DeviceMultiselect />
                <TextareaField
                  name="deviceRequirements"
                  label="Device requirements"
                />
              </Section>
              <Section title="Chi" id="who">
                <CountrySelect />
                <LanguageSelect />
                <TextareaField name="targetNotes" label="Target notes" />
                <InputField
                  type="number"
                  min={0}
                  name="targetSize"
                  label="Target Size"
                />
              </Section>
              <Section title="Come" id="how">
                <TextareaField name="goal" label="Goals" />
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
