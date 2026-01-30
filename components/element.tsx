import { type IElement } from "@/types/element";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface ElementProps {
  element: IElement;
}

const Element = ({ element }: ElementProps) => {
  const {} = useDraggable({
    id: element.text,
    data: {
      type: "element",
      element,
    },
  });
  return (
    <div className="flex p-1 rounded-md border px-2 items-center select-none gap-1 w-fit h-fit cursor-pointer">
      <div>{element.emoji}</div>
      <div className="font-bold ">{element.text}</div>
    </div>
  );
};

export default Element;
