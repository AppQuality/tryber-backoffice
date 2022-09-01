import { useAppSelector } from "src/store";

export const FormConfigurator = () => {
  const { selectedFields } = useAppSelector(
    (state) => state.campaignPreselection
  );
  return (
    <div>
      {selectedFields.map((field) => (
        <div key={field.fieldData.id}>
          name:{" "}
          {typeof field.fieldData.name === "string"
            ? field.fieldData.name
            : field.fieldData.name.it}
        </div>
      ))}
    </div>
  );
};
