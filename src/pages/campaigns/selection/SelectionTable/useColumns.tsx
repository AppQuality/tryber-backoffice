import { TableType } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import SelectAllFirstDevicesCheckbox from "./components/SelectAllFirstDevicesCheckbox";

export const useColumns: () => TableType.Column[] = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  const customColums = (data || []).map((q) => ({
    dataIndex: `question_${q.id}`,
    key: `question_${q.id}`,
    title: q.shortName || q.question,
  }));

  return [
    {
      dataIndex: "nameId",
      key: "nameId",
      title: "Name ID",
    },
    ...customColums,
    {
      dataIndex: "age",
      key: "age",
      title: "Age",
    },
    {
      dataIndex: "gender",
      key: "gender",
      title: "Gender",
    },
    {
      dataIndex: "metallevel",
      key: "metallevel",
      title: "Metal Level",
    },
    {
      dataIndex: "exppoints",
      key: "exppoints",
      title: "Experience Points",
    },
    {
      dataIndex: "bhlevel",
      key: "bhlevel",
      title: "BH Level",
    },
    {
      dataIndex: "devices",
      key: "devices",
      title: "Devices",
    },
    {
      dataIndex: "os",
      key: "os",
      title: "OS",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: (
        <SelectAllFirstDevicesCheckbox
          data-testid="selectAllFirstDevices"
          campaignId={id}
        />
      ),
    },
  ];
};
