import { Card, Select, Title } from "@appquality/appquality-design-system";
import Video from "@appquality/stream-player";
import { FieldArray, useFormikContext } from "formik";
import { useMemo } from "react";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { Plus } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import {
  GetCampaignsByCampaignObservationsApiResponse,
  useGetCampaignsByCampaignObservationsQuery,
} from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import DragNDropProvider from "../DragNDropProvider";
import { FormValuesInterface, FormVideoPart } from "../FormProvider";
import VideoPart from "./VideoPart";

export type VideoPartsOption = SelectOptionType &
  GetCampaignsByCampaignObservationsApiResponse["items"][number];

type NewInsightVideopart = Pick<
  FormVideoPart,
  "internalId" | "mediaId" | "start" | "url" | "streamUrl" | "description"
>;

const StyledAddNewEvidence = styled.div`
  display: grid;
  grid-template-columns: 165px 1fr;
  grid-template-rows: 1fr;
  gap: ${({ theme }) => theme.grid.spacing.default};
`;

const PlusContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`;

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
        label:
          observation.name +
          " - " +
          observation.tester.name +
          " - " +
          observation.cluster?.name,
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
                onDragEnd={handleDragEnd}
                items={videoParts}
                renderItem={(videopart, index, dragHandleProps) => (
                  <Video
                    start={videopart.start}
                    src={videopart.streamUrl || videopart.url}
                  >
                    <VideoPart
                      key={videopart.internalId}
                      start={videopart.start}
                      videoPartIndex={index}
                      fieldName={fieldName}
                      remove={remove}
                      handleDragProps={dragHandleProps}
                      title={
                        observationsOptions.find(
                          (option) => option.media.id === videopart.mediaId
                        )?.label
                      }
                    />
                  </Video>
                )}
              />
              <Card shadow data-qa="add-new-videopart">
                <StyledAddNewEvidence>
                  <PlusContainer>
                    <Plus size={100} className="aq-mr-2" />
                  </PlusContainer>
                  <div>
                    <Title size="s" className="aq-mb-2">
                      Aggiungi una nuova evidenza
                    </Title>
                    <Select
                      menuTargetQuery="body"
                      options={observationsOptions}
                      label="Seleziona lo spezzone video"
                      name={"observation"}
                      menuPlacement="top"
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
                </StyledAddNewEvidence>
              </Card>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default VideoParts;
