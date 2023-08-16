import { ReactNode } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import styled from "styled-components";

interface DragNDropProviderProps<T> {
  items: T[];
  onDragEnd: OnDragEndResponder;
  renderItem: (
    item: T,
    index: number,
    dragHandleProps?: DraggableProvidedDragHandleProps | null
  ) => ReactNode;
  className?: string;
}

const Wrapper = styled.div<{ isDraggingOver: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.grid.sizes[3]};
`;

const DraggableItem = styled.div<{ isDragging: boolean }>`
  ${({ isDragging }) => isDragging && "cursor: handle;"};
`;

function DragNDropProvider<T extends { internalId: string }>({
  onDragEnd,
  items,
  renderItem,
  className,
}: DragNDropProviderProps<T>) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable-area"
        key="droppable-area"
        direction="vertical"
      >
        {(provided, snapshot) => (
          <Wrapper
            className={className}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((videopart: T, index) => (
              <Draggable
                key={`${videopart.internalId}`}
                draggableId={`${videopart.internalId}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <DraggableItem
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {renderItem &&
                      renderItem(videopart, index, provided.dragHandleProps)}
                  </DraggableItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default DragNDropProvider;
