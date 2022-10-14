import { Button, Select } from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignFormsQuery } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { setQuestionsId } from "../../selectionSlice";
import { mapCampaingFormData, mapSelectedQuestions } from "./mapData";

const ColumnsConfigurator = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<Option[]>([]);
  const { data } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  return (
    <div>
      <Select
        name="addColumns"
        label=""
        options={mapCampaingFormData(data)}
        value={value}
        onChange={(v) => Array.isArray(v) && setValue(v)}
        placeholder={`Add columns by Form Campaign ${id}`}
        noOptionsMessage={() => "No questions"}
        isMulti
      />
      <Button
        className="aq-mt-3 aq-mb-2"
        size="block"
        type="primary"
        data-testid="columnsConfigurator_apply"
        onClick={() => {
          dispatch(setQuestionsId(mapSelectedQuestions(value)));
        }}
      >
        Apply
      </Button>
    </div>
  );
};

export default ColumnsConfigurator;
