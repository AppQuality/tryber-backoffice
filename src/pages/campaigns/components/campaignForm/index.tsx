import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Form,
  FormLabel,
  Text,
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
import FormProvider, { NewCampaignValues } from "./FormProvider";
import { Section } from "./Section";
import { Stepper } from "./Stepper";
import { CampaignFormContext } from "./campaignFormContext";
import FormOverlay from "./feedbackMessages/FormOverlay";
import BrowsersMultiselect from "./fields/BrowsersMultiselect";
import CountrySelect from "./fields/CountrySelect";
import CustomerSelect from "./fields/CustomerSelect";
import { FieldWrapper } from "./fields/FieldWrapper";
import InputField from "./fields/InputField";
import LanguageSelect from "./fields/LanguagesSelect";
import ProductType from "./fields/ProductTypeSelect";
import TestTypeSelect from "./fields/TestTypeSelect";
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

const Submit = () => {
  const { submitForm, values } = useFormikContext<NewCampaignValues>();
  return (
    <>
      <Button type="submit" size="block" onClick={submitForm}>
        {values.isEdit ? "Save" : "Save as Draft"}
      </Button>
      {!values.isEdit && (
        <Text className="aq-text-center aq-mt-3">
          Once you’ve saved the draft you’ll be able to confirm the campaign
        </Text>
      )}
    </>
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

const CampaignFormContent = ({ dossier, isEdit, duplicate }: FormProps) => {
  return (
    <FormProvider dossier={dossier} isEdit={isEdit} duplicate={duplicate}>
      <FullGrid>
        <FormOverlay />
        <BSCol size="col-lg-9">
          <Form id="campaign-form">
            <Section
              title="General Set Up"
              subtitle="In this section, there are the essential details of the campaign, such as the name and the start and end dates."
              id="general"
            >
              <Card className="aq-mb-4" title="What is the campaign about?">
                <Title size="s" className="aq-mb-2">
                  Identify the campaign{" "}
                  <span className="aq-text-danger">*</span>
                </Title>
                <FieldWrapper>
                  <InputField
                    name="customerTitle"
                    label="Campaign Title (for customer)"
                    required
                  />
                  <InputField
                    name="testerTitle"
                    label="Campaign Title (for tester)"
                    required
                  />
                  <TestTypeSelect />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2 aq-pt-4">
                  Give some context to your co-workers
                </Title>
                <FieldWrapper>
                  <TextareaField
                    name="description"
                    label="Campaign Description"
                    placeholder="Verrà testato il prodotto [nome prodotto, tipologia del prodotto] attraverso un test di [tipologia di test]. 
                  Il suo scopo principale è [in che modo il prodotto migliora la vita delle persone]."
                  />
                  <div>
                    <FormLabel
                      htmlFor=""
                      label="Who is going to see this description?"
                    />
                    <Title size="s" className="aq-mb-1 aq-text-info">
                      💡 Use this field to describe the campaign to PMs, TLs and
                      Researcher
                    </Title>
                    <Text>Customers and Trybers will NOT see it</Text>
                  </div>
                </FieldWrapper>
              </Card>
              <Card className="aq-mb-4" title="Who is the customer?">
                <Title size="s" className="aq-mb-2">
                  Choose new customer/project{" "}
                  <span className="aq-text-danger">*</span>
                  <span className="aq-text-info"> (💡or create new ones)</span>
                </Title>
                <FieldWrapper>
                  <CustomerSelect dossier={dossier} />
                </FieldWrapper>
              </Card>
              <Card
                className="aq-mb-4"
                title="When the campaign will be executed?"
              >
                <Title size="s" className="aq-mb-2">
                  Identify running period{" "}
                  <span className="aq-text-danger">*</span>
                </Title>
                <FieldWrapper>
                  <StartDatePicker />
                  <EndDatePicker />
                  <CloseDatePicker />
                  {!isEdit && (
                    <Title size="s" className="aq-text-info aq-pt-2 aq-mt-4">
                      💡 Close date has been auto-generated
                    </Title>
                  )}
                </FieldWrapper>
              </Card>
            </Section>
            <Section
              title="Roles"
              subtitle="Who will be the contacts for the campaign? Define them here."
              id="roles"
            >
              <Card
                className="aq-mb-4"
                title="Who is going to work on the campaign?"
              >
                <Title size="s" className="aq-mb-2">
                  Identify front-facing roles
                </Title>
                <FieldWrapper>
                  <CsmSelect dossier={dossier} />
                  <PmSelect dossier={dossier} />
                </FieldWrapper>
                <ResearcherSelect dossier={dossier} />
                <Title size="s" className="aq-mb-2 aq-pt-4">
                  Select Tryber Assistants
                </Title>
                <FieldWrapper>
                  <TlSelect dossier={dossier} />
                </FieldWrapper>
              </Card>
            </Section>
            <Section
              title="Test Details"
              subtitle="Define the type and objectives of the test here."
              id="what"
            >
              <Card className="aq-mb-4" title="What are we going to test?">
                <Title size="s" className="aq-mb-2">
                  Product to be tested
                </Title>
                <FieldWrapper>
                  <ProductType />
                  <InputField
                    type="text"
                    name="productLink"
                    label="Product Link"
                  />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2 aq-pt-4">
                  Define the test perimeter
                </Title>
                <FieldWrapper>
                  <TextareaField
                    name="goal"
                    label="Test Perimeter"
                    placeholder="The test will cover..."
                  />
                  <TextareaField
                    name="outOfScope"
                    label="Out of scope"
                    placeholder="The test will NOT cover..."
                  />
                </FieldWrapper>
              </Card>
              <Card className="aq-mb-4" title="Where we are going to test it?">
                <Title size="s" className="aq-mb-2">
                  List devices, OS and Browsers accepted for the test
                </Title>
                <DeviceMultiselect />
                <FieldWrapper>
                  <BrowsersMultiselect />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2 aq-pt-4">
                  Add additional info on device requirements
                </Title>
                <FieldWrapper>
                  <TextareaField
                    name="deviceRequirements"
                    label="Device requirements"
                    placeholder="If necessary, enter specific device requirements here"
                  />
                </FieldWrapper>
              </Card>
            </Section>
            <Section
              title="Target Details"
              subtitle="Define the target details here."
              id="who"
            >
              <Card className="aq-mb-4" title="Who are we testing with?">
                <Title size="s" className="aq-mb-2">
                  Set the target
                </Title>
                <InputField
                  type="number"
                  name="targetSize"
                  label="Number of participants"
                  style={{ maxWidth: "225px" }}
                />
                <FieldWrapper>
                  <CountrySelect />
                  <LanguageSelect />
                </FieldWrapper>
                <Title size="s" className="aq-mb-2 aq-pt-4">
                  Add additional requirements or notes
                </Title>
                <FieldWrapper>
                  <TextareaField
                    name="targetNotes"
                    label="Trybers' additional requirements"
                    placeholder="The target has to..."
                  />
                </FieldWrapper>
              </Card>
            </Section>
            <Section title="Additional Notes" id="notes" subtitle="">
              <Card
                className="aq-mb-4"
                title="What we need to acknowledge to successfully deliver the test?"
              >
                <Title size="s" className="aq-mb-2 ">
                  Specify any operational constraint or requirements
                </Title>
                <TextareaField
                  name="notes"
                  label="Additional test notes"
                  placeholder="The kick-off call will be on... Customers will be release on production on..."
                />
              </Card>
            </Section>
          </Form>
        </BSCol>
        <BSCol size="col-lg-3">
          <StickyContainer>
            <Card title="Azioni" className="aq-mb-3">
              <Submit />
            </Card>
            <Card title="Form Sections" className="aq-mb-3">
              <Stepper />
            </Card>
          </StickyContainer>
        </BSCol>
        <FocusError />
      </FullGrid>
    </FormProvider>
  );
};

export default CampaignForm;
