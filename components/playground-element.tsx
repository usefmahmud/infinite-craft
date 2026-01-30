import { IPlaygroundElement } from "@/types/element";
import React from "react";
import Element from "./element";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface PlaygroundElementProps {
  element: IPlaygroundElement;
}

const PlaygroundElement = ({ element }: PlaygroundElementProps) => {
  const {
    attributes,
    listeners,
    transform,
    setNodeRef: setDraggableNodeRef,
  } = useDraggable({
    id: element.text,
    data: {
      type: "playground-element",
      element,
    },
  });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: element.text,
    data: {
      type: "playground-element",
      element,
    },
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setDraggableNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        position: "absolute",
        width: "fit-content",
        height: "fit-content",
        x: element.x,
        y: element.y,
      }}
    >
      <div ref={setDroppableNodeRef}>
        <Element
          element={{
            text: element.text,
            emoji: element.emoji,
          }}
        />
      </div>
    </div>
  );
};

export default PlaygroundElement;
