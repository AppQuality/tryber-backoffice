import {
  ErrorMessage,
  FormGroup,
  Select,
  FormikField,
  FieldProps,
} from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { Key, useMemo, useState } from "react";
import VideoParts from "./VideoPart";
import { ObservationsWrapper } from "../styled";
import VideoPart from "./VideoPart";

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
      <FieldArray
        name="observations"
        render={({ form, remove, push, name }) => (
          <div>
            <Select
              menuTargetQuery="body"
              isMulti
              options={observationsOptions}
              label="Observations"
              name={name}
              value={form.getFieldProps(name).value}
              onChange={(value) => {
                form.setFieldValue(name, value);
              }}
            />
            <ObservationsWrapper>
              {form
                .getFieldProps(name)
                .value.map(
                  (
                    observation: { id: Key | null | undefined },
                    index: number
                  ) => (
                    <VideoPart
                      observation={observation}
                      index={index}
                      key={observation.id}
                    />
                  )
                )}
            </ObservationsWrapper>
          </div>
        )}
      />
    </>
  );
};

export default Observations;
