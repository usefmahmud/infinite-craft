import { type IElement } from "@/types/element";
import React from "react";
import Element from "./element";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface SidebarElementProps {
  element: IElement;
}

const SidebarElement = ({ element }: SidebarElementProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.text,
    data: {
      type: "element",
      element,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
    >
      <Element element={element} />
    </div>
  );
};

export default SidebarElement;
