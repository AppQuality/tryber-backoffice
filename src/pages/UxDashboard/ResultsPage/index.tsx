import { Button, Text, Title } from "@appquality/appquality-design-system";
import { setCurrentStep } from "../uxDashboardSlice";
import { useAppDispatch } from "src/store";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "../UxForm/FormProvider";
import { ReactComponent as Success } from "./assets/success.svg";
import { ReactComponent as Fail } from "./assets/fail.svg";

const ResultsPage = () => {
  const dispatch = useAppDispatch();
  const { status, setStatus } = useFormikContext<FormValuesInterface>();
  console.log(status);
  return (
    <div>
      <Text className="aq-mb-3">
        {status === "success" ? <Success /> : <Fail />}
        <Title size="ms">
          {status === "success" ? (
            <span>La preview è stata pubblicata correttamente!"</span>
          ) : (
            <span>
              La pubblicazione della preview non è andata a buon fine!
              <br />
              Tranquillo puoi riprovare!
            </span>
          )}
        </Title>
        <Button
          type="link"
          data-qa="back-to-form"
          onClick={() => {
            setStatus(undefined);
            dispatch(setCurrentStep(0));
          }}
        >
          Torna al form per apportare nuove modifiche
        </Button>
      </Text>
    </div>
  );
};

export default ResultsPage;
