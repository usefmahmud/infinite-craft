import { type IElement } from "@/types/element";
import React from "react";
import Element from "./element";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface SidebarElementProps {
  element: IElement;
}

const SidebarElement = ({ element }: SidebarElementProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.text,
    data: {
      type: "sidebar-element",
      element,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 1000 : "auto",
      }}
    >
      <Element element={element} />
    </div>
  );
};

export default SidebarElement;
