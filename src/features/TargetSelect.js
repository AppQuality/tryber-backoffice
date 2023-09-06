import {
  Select,
  FormLabel,
  Input,
  Button,
  BSGrid,
  BSCol,
} from "@appquality/appquality-design-system";
import { useState } from "react";

const useTargets = ({ onChange, value }) => {
  const targetsList = [
    { value: "all", label: "All" },
    { value: "italian", label: "Italian" },
    { value: "non-italian", label: "Not Italian" },
    { value: "logged-in-year", label: "Logged in the last year" },
    { value: "not-logged-in-year", label: "Didn't log in the last year" },
    { value: "list", label: "List of testers" },
  ];
  const isList = Array.isArray(value);
  const [testerList, setTesterList] = useState(isList ? value.join(",") : "");
  const isListUpdated = isList ? testerList != value.join(",") : false;
  const currentValue = targetsList.find((t) => t.value == value);

  const updateTesterList = (testerList) => {
    const newValue = testerList
      .split(",")
      .map((v) => parseInt(v.replace(/[Tt]/, "")))
      .filter((v) => !isNaN(v))
      .filter((v, i, s) => s.indexOf(v) === i);
    onChange(newValue);
    setTesterList(newValue.join());
  };

  return (
    <div className="aq-mb-3">
      <FormLabel label="Targets" />
      <Select
        options={targetsList}
        value={
          currentValue ||
          (isList && { value: "list", label: "" }) || { label: "", value: "" }
        }
        onChange={(v) =>
          v.value === "list" ? updateTesterList(testerList) : onChange(v.value)
        }
      />
      {isList ? (
        <BSGrid>
          <BSCol size="col-10">
            <Input value={testerList} onChange={setTesterList} />
          </BSCol>
          <BSCol size="col-2">
            <Button
              type="success"
              size="sm"
              className="aq-float-right aq-my-1 aq-mx-2"
              disabled={!isListUpdated}
              flat={true}
              onClick={() => updateTesterList(testerList)}
            >
              Confirm
            </Button>
          </BSCol>
        </BSGrid>
      ) : null}
    </div>
  );
};

export default useTargets;
