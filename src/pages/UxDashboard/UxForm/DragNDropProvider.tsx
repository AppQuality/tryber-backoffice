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

const Wrapper = styled.div<{ isDraggingOver?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.grid.sizes[3]};
  > *:last-child {
    margin-bottom: ${({ theme }) => theme.grid.sizes[3]};
  }
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
            {items &&
              items.map((item: T, index) => (
                <Draggable
                  key={`${item?.internalId}`}
                  draggableId={`${item.internalId}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <DraggableItem
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {renderItem &&
                        renderItem(item, index, provided.dragHandleProps)}
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
