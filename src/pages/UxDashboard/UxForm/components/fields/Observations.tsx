import {
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
import { useFormikContext } from "formik";
import VideoPart from "./VideoPart";
import { FormVideoPart } from "../../FormProvider";
import { useAppSelector } from "src/store";
import Video from "@appquality/stream-player";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const VideoWrapper = styled.div<{ isDraggingOver: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: ${({ theme }) => theme.grid.sizes[4]};
`;

const CardDraggableContainer = styled.div<{ isDragging: boolean }>`
  ${({ isDragging }) => isDragging && "box-shadow: 0 0 0 2px #000000;"};
  cursor: grab;
`;

export type ObservationOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];
const Observations = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCampaignsByCampaignObservationsQuery({ campaign: id });
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const { getFieldProps } = useFormikContext();
  const fieldName = `insights[${insightIndex}].videoPart`;
  const observations = getFieldProps(fieldName).value;

  const observationsOptions: ObservationOption[] = useMemo(
    () =>
      data?.items.map((observation) => ({
        label: observation.name,
        value: observation.id.toString(),
        ...observation,
      })) || [],
    [data]
  );

  const handleDragEnd = (result: any) => {
    console.log(result);
  };

  return (
    <FieldArray
      name={fieldName}
      render={({ remove, push }) => {
        return (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="droppable-area"
              key="droppable-area"
              renderClone={(provided, snapshot, rubric) => (
                <CardDraggableContainer
                  isDragging={snapshot.isDragging}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Video start={0} src="">
                    <VideoPart
                      start={0}
                      videoPartIndex={rubric.source.index}
                      fieldName={fieldName}
                      remove={remove}
                    />
                  </Video>
                </CardDraggableContainer>
              )}
            >
              {(provided, snapshot) => (
                <VideoWrapper
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {observations.map(
                    (videopart: FormVideoPart, index: number) => (
                      <Draggable
                        key={`${videopart.internalId}`}
                        draggableId={`${videopart.internalId}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <CardDraggableContainer
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Video start={videopart.start} src={videopart.url}>
                              <VideoPart
                                start={videopart.start}
                                videoPartIndex={index}
                                fieldName={fieldName}
                                remove={remove}
                              />
                            </Video>
                          </CardDraggableContainer>
                        )}
                      </Draggable>
                    )
                  )}
                  <Draggable
                    key="add-new-observation"
                    draggableId="add-new-observation"
                    index={2}
                  >
                    {(provided, snapshot) => (
                      <CardDraggableContainer
                        isDragging={snapshot.isDragging}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card shadow>
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
                        </Card>
                      </CardDraggableContainer>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </VideoWrapper>
              )}
            </Droppable>
          </DragDropContext>
        );
      }}
    />
  );
};

export default Observations;
