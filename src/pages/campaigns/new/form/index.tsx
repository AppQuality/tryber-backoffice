import { useFormikContext } from "formik";
import FormProvider, { NewCampaignValues } from "./FormProvider";
import CsmSelect from "./fields/CsmSelect";
import CustomerSelect from "./fields/CustomerSelect";
import DeviceMultiselect from "./fields/DeviceMultiselect";
import StartDatePicker from "./fields/StartDatePicker";
import TestTypeSelect from "./fields/TestTypeSelect";
import TesterTitleInput from "./fields/TesterTitleInput";

const FormContent = () => {
  const { values } = useFormikContext<NewCampaignValues>();

  return (
    <>
      {JSON.stringify(values)}
      <CustomerSelect />
      <CsmSelect />
      <TestTypeSelect />
      <TesterTitleInput />

      <StartDatePicker />
      <DeviceMultiselect />
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
