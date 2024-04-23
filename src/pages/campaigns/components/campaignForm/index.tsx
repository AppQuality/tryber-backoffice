import { Form as FormikForm, FormikProps } from "formik";
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
import AutomaticDatesSwitch from "./fields/AutomaticDatesSwitch";
import LanguageSelect from "./fields/LanguagesSelect";
import TlSelect from "./fields/roles/TLSelect";
import PmSelect from "./fields/roles/PMSelect";
import ResearcherSelect from "./fields/roles/ResearcherSelect";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
}

const Form = ({ dossier }: FormProps) => (
  <FormProvider dossier={dossier}>
    {(props: FormikProps<NewCampaignValues>) => (
      <FormikForm id="campaign-form">
        <CustomerSelect />
        <CsmSelect />
        <TlSelect />
        <PmSelect />
        <ResearcherSelect />
        <CountrySelect />
        <TestTypeSelect />
        <TesterTitleInput />
        <CustomerTitleInput />
        <LanguageSelect />
        <StartDatePicker />
        <EndDatePicker />
        <CloseDatePicker />
        {!props.values.isEdit && <AutomaticDatesSwitch />}
        <DeviceMultiselect />

        <button type="submit">Submit</button>
      </FormikForm>
    )}
  </FormProvider>
);

export default Form;
