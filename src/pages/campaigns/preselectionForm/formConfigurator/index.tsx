import { useAppSelector } from "src/store";

export const FormConfigurator = () => {
  const { selectedFields } = useAppSelector(
    (state) => state.campaignPreselection
  );
  return (
    <div>
      {selectedFields.map((field) => (
        <div>name: {field.fieldData.name}</div>
      ))}
    </div>
  );
};
