import { Select, FormLabel } from "@appquality/appquality-design-system";

const showOnce = ({ onChange, value }) => {
  const targetsList = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];
  const currentValue = targetsList.find((t) => parseInt(t.value) == value);
  return (
    <div className="aq-mb-3">
      <FormLabel label="Show only once" />
      <Select
        options={targetsList}
        value={currentValue || { label: "", value: "" }}
        onChange={(v) => onChange(parseInt(v.value))}
      />
    </div>
  );
};

export default showOnce;
