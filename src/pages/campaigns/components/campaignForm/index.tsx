import { Form as FormikForm, FormikProps } from "formik";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import CsmSelect from "./fields/CsmSelect";
import CustomerSelect from "./fields/CustomerSelect";
import CustomerTitleInput from "./fields/CustomerTitleInput";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import StartDatePicker from "./fields/StartDatePicker";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";
import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";
import EndDatePicker from "./fields/EndDatePicker";
import CloseDatePicker from "./fields/CloseDatePicker";
import AutomaticDatesSwitch from "./fields/AutomaticDatesSwitch";

interface FormProps {
  dossier?: GetDossiersByCampaignApiResponse;
}

const Form = ({ dossier }: FormProps) => (
  <FormProvider dossier={dossier}>
    {(props: FormikProps<NewCampaignValues>) => (
      <FormikForm id="campaign-form">
        <CustomerSelect />
        <CsmSelect />
        <TestTypeSelect />
        <TesterTitleInput />
        <CustomerTitleInput />

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
