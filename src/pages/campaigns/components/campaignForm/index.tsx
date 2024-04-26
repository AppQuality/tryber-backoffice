import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Dropdown,
  Form,
  FormLabel,
  TextareaField,
  Title,
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
import BrowsersMultiselect from "./fields/BrowsersMultiselect";
import CountrySelect from "./fields/CountrySelect";
import CustomerSelect from "./fields/CustomerSelect";
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
import { FieldWrapper } from "./fields/FieldWrapper";

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

const CampaignForm = ({ dossier, isEdit, duplicate }: FormProps) => {
  return (
    <CampaignFormContext>
      <FormProvider dossier={dossier} isEdit={isEdit} duplicate={duplicate}>
        <FullGrid>
          <ResponsiveCol size="col-lg-3" lgOrder={2}>
            <StickyContainer>
              <Card title="Sezioni del form" className="aq-mb-3">
                <Stepper />
              </Card>
              <Submit />
            </StickyContainer>
          </ResponsiveCol>
          <ResponsiveCol size="col-lg-9" lgOrder={1}>
            <Form id="campaign-form">
              <Section
                title="Le informazioni principali della campagna"
                subtitle="Le informazioni principali della campagnaIn questa sezione ci sono le informazioni essenziali della campagna, come nome e date di partenza e chiusura"
                id="general"
              >
                <Title size="s" className="aq-mb-2">
                  Nome e tipologia di campagna
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
                    placeholder="Verrà testato il prodotto [nome prodotto, tipologia del prodotto] attraverso un test di [tipologia di test]. 
Il suo scopo principale è [in che modo il prodotto migliora la vita delle persone]."
                  />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2">
                  Date della campagna
                </Title>
                <FieldWrapper>
                  <StartDatePicker />
                  <EndDatePicker />
                  <CloseDatePicker />
                  {!isEdit && <AutomaticDatesSwitch />}
                </FieldWrapper>
              </Section>
              <Section
                title="Utenti e ruoli"
                subtitle="Chi saranno i riferimenti della campagna? Definiscilo qui."
                id="roles"
              >
                <Title size="s" className="aq-mb-2">
                  Utenti e Ruoli operativi
                </Title>
                <FieldWrapper>
                  <CsmSelect />
                  <TlSelect />
                  <PmSelect />
                  <ResearcherSelect />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2">
                  Cliente
                </Title>
                <FieldWrapper>
                  <CustomerSelect />
                  <div>
                    <FormLabel label="Referente" htmlFor="" />
                    <Dropdown isDisabled placeholder="work in progress" />
                  </div>
                </FieldWrapper>
              </Section>
              <Section
                title="Il prodotto o servizio da testare"
                subtitle="Definisci qui tipologia e obiettivi del test"
                id="what"
              >
                <Title size="s" className="aq-mb-2">
                  Tipologia di prodotto da testare
                </Title>
                <FieldWrapper>
                  <ProductType />
                  <InputField
                    type="url"
                    name="productLink"
                    label="Product Link"
                  />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2">
                  Tipologia di prodotto da testare
                </Title>
                <FieldWrapper>
                  <TextareaField
                    name="goal"
                    label="Obiettivo del test"
                    placeholder="L’obiettivo del test è..."
                  />
                  <TextareaField
                    name="outOfScope"
                    label="Out of scope"
                    placeholder="Saranno out of scope le seguenti sezioni o le seguenti tipologie di bug"
                  />
                </FieldWrapper>
              </Section>
              <Section
                title="Dispositivi e requisiti device per il tester"
                id="when"
              >
                <DeviceMultiselect />
                <FieldWrapper>
                  <BrowsersMultiselect />
                </FieldWrapper>
                <TextareaField
                  name="deviceRequirements"
                  label="Device requirements"
                />
              </Section>
              <Section title="Chi" id="who">
                <Title size="s" className="aq-mb-2">
                  Requisiti del target di test
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
                  <TextareaField
                    name="targetNotes"
                    label="Requisiti del target"
                    placeholder="Ad esempio: Gli utenti devono essere di genere distribuito, nella fascia di età 18-65..."
                  />
                  <TextareaField
                    name="targetInstructions"
                    label="Istruzioni per i tester"
                    placeholder="Ad esempio: I tester dovranno scaricare il plugin oppure dovranno effettuare un’iscrizione a proprie spese all’abbonamento premium, che verrà rimborsata"
                  />
                </FieldWrapper>
              </Section>
            </Form>
          </ResponsiveCol>
        </FullGrid>
      </FormProvider>
    </CampaignFormContext>
  );
};

export default CampaignForm;
