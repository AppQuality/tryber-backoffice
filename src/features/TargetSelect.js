import { Select, FormLabel } from "@appquality/appquality-design-system";

export default ({ onChange, value }) => {
  const targetsList = [
    { value: "all", label: "All" },
    { value: "italian", label: "Italian" },
    { value: "non-italian", label: "Not Italian" }
  ];
  const currentValue = targetsList.find(t => t.value == value);
  return (
    <div className="aq-mb-3">
      <FormLabel label="Targets" />
      <Select
        options={targetsList}
        value={currentValue || { label: "", value: "" }}
        onChange={v => onChange(v.value)}
      />
    </div>
  );
};
