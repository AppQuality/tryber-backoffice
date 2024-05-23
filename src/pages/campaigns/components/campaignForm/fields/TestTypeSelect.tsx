import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import { useGetCampaignTypesQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import { PM_ROLE_ID, TL_ROLE_ID } from "../getAssistantIdByRole";
import { SelectField } from "./SelectField";

const TestTypeSelect = () => {
  const { data: testTypes } = useGetCampaignTypesQuery();
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const options = useMemo(
    () =>
      testTypes?.map((testType) => ({
        value: testType.id.toString(),
        label: testType.name,
      })) || [],
    [testTypes]
  );

  const handleChange = useCallback(
    (option) => {
      const testType = testTypes?.find(
        (testType) => testType.id.toString() === option.value
      );
      if (!testType) return;

      const customRoles = testType.customRoles;
      const pm = customRoles?.find((role) => role.roleId === PM_ROLE_ID);
      if (pm && pm.userIds.length) {
        setFieldValue("pm", pm.userIds[0].toString());
      } else {
        setFieldValue("pm", "");
      }
      const tl = customRoles?.find((role) => role.roleId === TL_ROLE_ID);
      if (tl && tl.userIds.length) {
        setFieldValue(
          "tl",
          tl.userIds.map((id) => id.toString())
        );
      } else {
        setFieldValue("tl", []);
      }
    },
    [testTypes, setFieldValue]
  );

  return (
    <SelectField
      label="Test type"
      required
      options={options}
      name="testType"
      onChange={!values.isEdit ? handleChange : undefined}
    />
  );
};

export default TestTypeSelect;
