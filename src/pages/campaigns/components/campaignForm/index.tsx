import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Form,
  TextareaField,
  Title,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import {
  GetDossiersByCampaignApiResponse,
  PostDossiersApiArg,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import FocusError from "./FocusError";
import FormProvider from "./FormProvider";
import { Section } from "./Section";
import { Stepper } from "./Stepper";
import {
  CampaignFormContext,
  useCampaignFormContext,
} from "./campaignFormContext";
import BrowsersMultiselect from "./fields/BrowsersMultiselect";
import CountrySelect from "./fields/CountrySelect";
import CustomerSelect from "./fields/CustomerSelect";
import { FieldWrapper } from "./fields/FieldWrapper";
import InputField from "./fields/InputField";
import LanguageSelect from "./fields/LanguagesSelect";
import ProductType from "./fields/ProductTypeSelect";
import TestTypeSelect from "./fields/TestTypeSelect";
import AutomaticDatesSwitch from "./fields/dates/AutomaticDatesSwitch";
import CloseDatePicker from "./fields/dates/CloseDatePicker";
import EndDatePicker from "./fields/dates/EndDatePicker";
import StartDatePicker from "./fields/dates/StartDatePicker";
import DeviceMultiselect from "./fields/device/DeviceMultiselect";
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
    <Button type="submit" size="block" onClick={submitForm}>
      Submit
    </Button>
  );
};
const FullGrid = styled(BSGrid)`
  width: 100%;
`;

const CampaignForm = (props: FormProps) => (
  <CampaignFormContext>
    <CampaignFormContent {...props} />
  </CampaignFormContext>
);

const CreatingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CampaignFormContent = ({ dossier, isEdit, duplicate }: FormProps) => {
  const { isCreating } = useCampaignFormContext();
  return (
    <FormProvider dossier={dossier} isEdit={isEdit} duplicate={duplicate}>
      <FullGrid>
        {isCreating && (
          <CreatingOverlay>
            Creating campaign in progress
            <br />
            It may take a few seconds...
            <br />
          </CreatingOverlay>
        )}
        <ResponsiveCol size="col-lg-3" lgOrder={2}>
          <StickyContainer>
            <Card title="Form Sections" className="aq-mb-3">
              <Stepper />
            </Card>
            <Submit />
          </StickyContainer>
        </ResponsiveCol>
        <ResponsiveCol size="col-lg-9" lgOrder={1}>
          <Form id="campaign-form">
            <Section title="Campaign General Informations" id="general">
              <Title size="s" className="aq-mb-2">
                Campaign name and type
              </Title>
              <FieldWrapper>
                <InputField
                  name="customerTitle"
                  label="Campaign Title (for customer) *"
                />
                <InputField
                  name="testerTitle"
                  label="Campaign Title (for tester) *"
                />
                <TestTypeSelect />
                <TextareaField
                  name="description"
                  label="Description"
                  placeholder="The product to be tested is [...] and we need to verify that [...]"
                />
              </FieldWrapper>
              <Title size="s" className="aq-mb-2">
                Campaign dates
              </Title>
              <div className="aq-mb-2">
                {!isEdit && <AutomaticDatesSwitch />}
              </div>
              <FieldWrapper>
                <StartDatePicker />
                <EndDatePicker />
                <CloseDatePicker />
              </FieldWrapper>
            </Section>
            <Section title="Roles and Customer" id="roles">
              <Title size="s" className="aq-mb-2">
                Users and Roles
              </Title>
              <FieldWrapper>
                <CsmSelect dossier={dossier} />
                <TlSelect dossier={dossier} />
                <PmSelect dossier={dossier} />
                <ResearcherSelect dossier={dossier} />
              </FieldWrapper>
              <Title size="s" className="aq-mb-2">
                Client
              </Title>
              <FieldWrapper>
                <CustomerSelect dossier={dossier} />
              </FieldWrapper>
            </Section>
            <Section title="What do we need to test?" id="what">
              <FieldWrapper>
                <ProductType />
                <InputField
                  type="url"
                  name="productLink"
                  label="Product Link"
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextareaField
                  name="goal"
                  label="Test goal"
                  placeholder="The test goal is to verify that..."
                />
                <TextareaField
                  name="outOfScope"
                  label="Out of scope"
                  placeholder="The test will not cover..."
                />
              </FieldWrapper>
            </Section>
            <Section title="Where do we need to test?" id="where">
              <DeviceMultiselect />
              <FieldWrapper>
                <BrowsersMultiselect />
              </FieldWrapper>
              <TextareaField
                name="deviceRequirements"
                label="Device requirements"
                placeholder="If necessary, enter specific device requirements here"
              />
            </Section>
            <Section title="Who is going to test?" id="who">
              <Title size="s" className="aq-mb-2">
                Test target requirements
              </Title>
              <InputField
                type="number"
                min={0}
                name="targetSize"
                label="Target Size"
                style={{ maxWidth: "225px" }}
              />
              <FieldWrapper>
                <CountrySelect />
                <LanguageSelect />
              </FieldWrapper>
              <TextareaField
                name="targetNotes"
                label="Target requisites and other notes"
                placeholder="The target must be..."
              />
            </Section>
          </Form>
        </ResponsiveCol>
        <FocusError />
      </FullGrid>
    </FormProvider>
  );
};

export default CampaignForm;
