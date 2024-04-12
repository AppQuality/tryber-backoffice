import { useFormikContext } from "formik";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import CsmSelect from "./fields/CsmSelect";
import CustomerSelect from "./fields/CustomerSelect";
import CustomerTitleInput from "./fields/CustomerTitleInput";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import StartDatePicker from "./fields/StartDatePicker";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";

const FormContent = () => {
  const { values, submitForm, errors } = useFormikContext<NewCampaignValues>();

  return (
    <>
      {JSON.stringify(values)}
      {JSON.stringify(errors)}
      <CustomerSelect />
      <CsmSelect />
      <TestTypeSelect />
      <TesterTitleInput />
      <CustomerTitleInput />

      <StartDatePicker />
      <DeviceMultiselect />

      <button type="submit">Submit</button>
    </>
  );
};

const Form = () => {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
};

export default Form;
