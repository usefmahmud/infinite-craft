import { IPlaygroundElement } from "@/types/element";
import React from "react";
import PlaygroundElement from "./playground-element";
import { useDroppable } from "@dnd-kit/core";

interface PlaygroundProps {
  elements: IPlaygroundElement[];
}

const Playground = ({ elements }: PlaygroundProps) => {
  const { setNodeRef } = useDroppable({
    id: "playground",
    data: {
      type: "playground",
    },
  });
  return (
    <div className="w-full h-full relative" ref={setNodeRef}>
      {elements.map((element) => (
        <PlaygroundElement key={element.id} element={element} />
      ))}
    </div>
  );
};

export default Playground;
