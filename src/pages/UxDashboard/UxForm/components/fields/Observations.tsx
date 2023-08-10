import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Select,
  Title,
} from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { useMemo } from "react";
import VideoPart from "./VideoPart";
import { FormValuesInterface } from "../../FormProvider";
import { useAppSelector } from "src/store";
import Video from "@appquality/stream-player";

export type ObservationOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];
const Observations = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);

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
    <BSGrid>
      <FieldArray
        name={`insights[${insightIndex}].videoPart`}
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
                    <BSCol
                      size="col-lg-4"
                      className="aq-mb-4"
                      key={videopart.id}
                    >
                      <Card>
                        <Video start={videopart.start} src={videopart.url}>
                          <VideoPart
                            start={videopart.start}
                            videoPartIndex={index}
                            fieldName={name}
                          />
                        </Video>
                        <Button
                          flat
                          type="danger"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </Card>
                    </BSCol>
                  )
                )}
              <BSCol size="col-lg-4" key="new-observation">
                <Card shadow>
                  <div>
                    <Title size="s" className="aq-mb-2">
                      Aggiungi una nuova evidenza
                    </Title>
                    <Select
                      menuTargetQuery="body"
                      options={observationsOptions}
                      label="Seleziona lo spezzone video"
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
                  </div>
                </Card>
              </BSCol>
            </>
          );
        }}
      />
    </BSGrid>
  );
};

export default Observations;
