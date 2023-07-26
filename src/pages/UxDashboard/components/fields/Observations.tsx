import {
  ErrorMessage,
  FormGroup,
  Select,
  FormikField,
  FieldProps,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { useMemo } from "react";
import VideoParts from "./VideoParts";

export type ObservationOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];
const Observations = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });

  const observationsOptions: ObservationOption[] = useMemo(() => {
    return (
      data?.items.map((observation) => ({
        label: observation.name,
        value: observation.id.toString(),
        ...observation,
      })) || []
    );
  }, [data]);
  return (
    <>
      <FormikField name="observations">
        {({ field, form }: FieldProps) => {
          return (
            <FormGroup>
              <Select
                menuTargetQuery="body"
                isMulti
                options={observationsOptions}
                label="Observations"
                name={field.name}
                value={field.value}
                onChange={(value) => {
                  form.setFieldValue(field.name, value);
                }}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
      <VideoParts />
    </>
  );
};

export default Observations;
