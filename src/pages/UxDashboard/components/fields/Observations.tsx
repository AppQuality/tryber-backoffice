import { Button, Card, Select } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { useMemo } from "react";
import { VideoPartsWrapper } from "../styled";
import VideoPart from "./VideoPart";
import { FormValuesInterface } from "../../UxForm";

export type ObservationOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];
const Observations = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });

  const observationsOptions: ObservationOption[] = useMemo(
    () =>
      data?.items.map((observation) => ({
        label: observation.name,
        value: observation.id.toString(),
        ...observation,
      })) || [],
    [data]
  );

  return (
    <VideoPartsWrapper>
      <FieldArray
        name="videoparts"
        render={({ form, remove, push, name }) => {
          return (
            <>
              {form
                .getFieldProps(name)
                .value?.map(
                  (
                    videopart: FormValuesInterface["insights"][number]["videoPart"][number],
                    index: number
                  ) => (
                    <Card key={videopart.id}>
                      <VideoPart videopart={videopart} index={index} />
                      <Button flat type="danger" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </Card>
                  )
                )}
              <Card>
                <Select
                  menuTargetQuery="body"
                  options={observationsOptions}
                  label="Add a new observation"
                  name={"observation"}
                  value={[]}
                  onChange={(value) => {
                    if (!value) {
                      return;
                    }
                    push({
                      // push a new videopart to the field array
                      start: value.time,
                      mediaId: value.media.id,
                      url: value.media.url,
                      streamUrl: value.media.streamUrl,
                    });
                  }}
                />
              </Card>
            </>
          );
        }}
      />
    </VideoPartsWrapper>
  );
};

export default Observations;
