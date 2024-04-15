import { useFormikContext } from "formik";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import CsmSelect from "./fields/CsmSelect";
import CustomerSelect from "./fields/CustomerSelect";
import CustomerTitleInput from "./fields/CustomerTitleInput";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import StartDatePicker from "./fields/StartDatePicker";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";
import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
}

const Form = ({ dossier }: FormProps) => (
  <FormProvider dossier={dossier}>
    <CustomerSelect />
    <CsmSelect />
    <TestTypeSelect />
    <TesterTitleInput />
    <CustomerTitleInput />

    <StartDatePicker />
    <DeviceMultiselect />

    <button type="submit">Submit</button>
  </FormProvider>
);

export default Form;
