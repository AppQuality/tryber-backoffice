import { Button, Text } from "@appquality/appquality-design-system";
import { setCurrentStep } from "../uxDashboardSlice";
import { useAppDispatch } from "src/store";

const ResultsPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Text className="aq-mb-3">
        bravo/a hai pubblicato tutto{" "}
        <Button
          type="link"
          data-qa="back-to-form"
          onClick={() => dispatch(setCurrentStep(0))}
        >
          Torna al form per apportare nuove modifiche
        </Button>
      </Text>
    </div>
  );
};

export default ResultsPage;
