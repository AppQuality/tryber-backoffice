import { useDrop } from "react-dnd";
import { FC } from "react";

export const DropZone: FC<{ dropIndex: number }> = ({ dropIndex }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "field",
      drop: () => ({ dropIndex: dropIndex }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <div
      className="aq-mb-3"
      style={{
        height: isOver ? "45px" : "8px",
        border: isOver ? "2px dashed grey" : "",
      }}
      ref={drop}
    />
  );
};
