import { Button, Select } from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useState } from "react";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { setQuestionsId } from "../../selectionSlice";
import { mapCampaingFormData, mapSelectedQuestions } from "./mapData";

interface ColumnsConfiguratorProps {
  id: string;
}

const ColumnsConfigurator = ({ id }: ColumnsConfiguratorProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Option[]>([]);
  const [disableApply, setDisableApply] = useState(true);
  const { data } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  return (
    <div>
      <Select
        name="addColumns"
        label={`Add columns by Form Campaign ${id}`}
        options={mapCampaingFormData(data)}
        value={value}
        onChange={(v) => {
          Array.isArray(v) && setValue(v);
          setDisableApply(false);
        }}
        placeholder={"Select questions form"}
        noOptionsMessage={() => "No questions"}
        isMulti
      />
      <Button
        className="aq-mt-3 aq-mb-2"
        size="block"
        type="primary"
        data-testid="columnsConfigurator_apply"
        disabled={disableApply}
        onClick={() => {
          dispatch(setQuestionsId(mapSelectedQuestions(value)));
          setDisableApply(true);
        }}
      >
        Apply
      </Button>
    </div>
  );
};

export default ColumnsConfigurator;
