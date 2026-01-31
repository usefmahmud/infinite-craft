import React from "react";
import Element from "../elements/element";
import SidebarElement from "../elements/sidebar-element";
import { useDroppable } from "@dnd-kit/core";
import { IElement } from "@/types/element";

interface SidebarProps {
  elements: IElement[];
}

const Sidebar = ({ elements }: SidebarProps) => {
  const { setNodeRef } = useDroppable({
    id: "sidebar",
    data: {
      type: "sidebar",
    },
  });

  return (
    <div className="h-screen border-l max-w-80 w-full p-4" ref={setNodeRef}>
      <div className="flex gap-2 flex-wrap">
        {elements.map((element) => (
          <SidebarElement key={element.text} element={element} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
