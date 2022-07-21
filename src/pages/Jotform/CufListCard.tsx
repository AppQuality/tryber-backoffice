import { Card, Checkbox } from "@appquality/appquality-design-system";

export const CufListCard = () => {
  const additionalFields = [
    {
      group: {
        id: 0,
        name: {
          it: "Electricity Supplier",
          en: "Electricity Supplier",
          es: "Electricity Supplier",
        },
      },
      fields: {
        id: 0,
        type: "multiselect",
        name: {
          it: "",
          en: "",
          es: "",
        },
        options: [
          {
            id: 0,
            name: "",
          },
        ],
      },
    },
  ];

  return (
    <Card title={"Additional fields selection"} className="aq-mb-3">
      {additionalFields.map((a) => (
        <Checkbox
          key={a.group.id}
          id={a.group.id.toString()}
          label={a.group.name.en}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
