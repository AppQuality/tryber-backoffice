import {
  Field,
  FieldProps,
  FormikField,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import SeverityField from "./fields/SeverityField";
import ClusterField from "./fields/ClusterField";
import { FormValuesInterface } from "../UxDashboardForm";
import Observations from "./fields/Observations";

export interface InsightFormValues {
  id: number;
  title: string;
  description: string;
  severity: SelectOptionType;
  cluster: SelectOptionType[];
  videoparts?: FormValuesInterface["insights"][number]["videoPart"];
}

export const InsightForm = () => {
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);

  return (
    <div data-qa="insight-form">
      <Field name={`insights[${insightIndex}].title`} label="Title" />
      <TextareaField
        name={`insights[${insightIndex}].description`}
        label="Description"
      />
      <FormikField name={`insights[${insightIndex}].severity`}>
        {(fieldProps: FieldProps) => <SeverityField {...fieldProps} />}
      </FormikField>
      <FormikField name={`insights[${insightIndex}].cluster`}>
        {(fieldProps: FieldProps) => <ClusterField {...fieldProps} />}
      </FormikField>
      <Observations />
    </div>
  );
};
