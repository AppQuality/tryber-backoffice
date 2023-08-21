import { Select, Title } from "@appquality/appquality-design-system";
import { FieldArray } from "formik";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { useMemo } from "react";
import { useFormikContext } from "formik";
import VideoPart from "./VideoPart";
import { FormValuesInterface, FormVideoPart } from "../FormProvider";
import { useAppSelector } from "src/store";
import Video from "@appquality/stream-player";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import DragNDropProvider from "../DragNDropProvider";
import { ListItemCard } from "./ListItemCard";

export type VideoPartsOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];

type NewInsightVideopart = Pick<
  FormVideoPart,
  "internalId" | "mediaId" | "start" | "url" | "streamUrl" | "description"
>;

const VideoParts = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const { values } = useFormikContext<FormValuesInterface>();
  const fieldName = `insights[${insightIndex}].videoParts`;
  const videoParts = values.insights[insightIndex].videoParts;

  const observationsOptions: VideoPartsOption[] = useMemo(
    () =>
      data?.items.map((observation) => ({
        label: observation.name,
        value: observation.id.toString(),
        ...observation,
      })) || [],
    [data]
  );

  return (
    <div id="video-parts">
      <FieldArray name={fieldName}>
        {({ remove, push, move }) => {
          const handleDragEnd: OnDragEndResponder = (result) => {
            if (!result.destination) {
              return;
            }
            move(result.source.index, result.destination.index);
          };
          return (
            <>
              <DragNDropProvider<FormVideoPart>
                className="aq-mb-3"
                onDragEnd={handleDragEnd}
                items={videoParts}
                renderItem={(videopart, index, dragHandleProps) => (
                  <Video start={videopart.start} src={videopart.url}>
                    <VideoPart
                      start={videopart.start}
                      videoPartIndex={index}
                      fieldName={fieldName}
                      remove={remove}
                      handleDragProps={dragHandleProps}
                    />
                  </Video>
                )}
              />
              <ListItemCard>
                <div />
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
                      const newVideopart: NewInsightVideopart = {
                        internalId: uuidv4(),
                        mediaId: value.media.id,
                        start: value.time,
                        url: value.media.url,
                        streamUrl: value.media.streamUrl,
                        description: "",
                      };
                      push(newVideopart);
                    }}
                  />
                </div>
              </ListItemCard>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default VideoParts;
