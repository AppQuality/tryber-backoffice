import { Button, Title } from "@appquality/appquality-design-system";
import { setCurrentStep } from "../uxDashboardSlice";
import { useAppDispatch } from "src/store";
import { useFormikContext } from "formik";
import { FormValuesInterface } from "../UxForm/FormProvider";
import { ReactComponent as Success } from "./assets/success.svg";
import { ReactComponent as Fail } from "./assets/fail.svg";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { usePatchCampaignsByCampaignUxMutation } from "src/services/tryberApi";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { status, setStatus } = useFormikContext<FormValuesInterface>();
  const [saveDashboard] = usePatchCampaignsByCampaignUxMutation();
  const origin =
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("dev.")
      ? "https://dev.unguess.io"
      : "https://unguess.io";

  return (
    <StyledContainer>
      {status === "success" ? <Success /> : <Fail />}
      <Title size="ms" className="aq-mb-3">
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
      {status === "success" ? (
        <Button
          as="a"
          href={`${origin}/campaigns/${id}`}
          className="aq-mb-3"
          data-qa="go-to-campaign-page"
        >
          Vai alla campagna
        </Button>
      ) : (
        <Button
          onClick={() => {
            const res = saveDashboard({
              campaign: id,
              body: {
                status: "publish",
              },
            });
            if ("error" in res) {
              setStatus("error");
            } else {
              setStatus("success");
            }
          }}
          className="aq-mb-3"
          data-qa="go-to-campaign-page"
        >
          Riprova
        </Button>
      )}
      <Button
        className="aq-mb-3"
        flat
        data-qa="back-to-form"
        onClick={() => {
          setStatus(undefined);
          dispatch(setCurrentStep(0));
        }}
      >
        Torna al form per apportare nuove modifiche
      </Button>
    </StyledContainer>
  );
};

export default ResultsPage;
