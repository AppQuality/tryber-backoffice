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
import { FormVideoPart } from "../FormProvider";
import { useAppSelector } from "src/store";
import Video from "@appquality/stream-player";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import DragNDropProvider from "./DragNDropProvider";
import { ListItemCard } from "./ListItemCard";
import styled from "styled-components";

export type VideoPartsOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];

const VideoParts = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const { getFieldProps } = useFormikContext();
  const fieldName = `insights[${insightIndex}].videoPart`;
  const videoParts = getFieldProps(fieldName).value;

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
                    push({
                      // push a new videopart to the field array
                      start: value.time,
                      mediaId: value.media.id,
                      internalId: uuidv4(),
                      url: value.media.url,
                      streamUrl: value.media.streamUrl,
                    });
                  }}
                />
              </div>
            </ListItemCard>
          </>
        );
      }}
    </FieldArray>
  );
};

export default VideoParts;
