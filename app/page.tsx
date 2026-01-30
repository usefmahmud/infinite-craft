"use client";

import Element from "@/components/element";
import Playground from "@/components/playground";
import Sidebar from "@/components/sidebar";
import { IElement, IPlaygroundElement } from "@/types/element";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

const Home = () => {
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [activeElement, setActiveElement] = useState<IElement | null>(null);
  const [playgroundElements, setPlaygroundElements] = useState<
    IPlaygroundElement[]
  >([
    {
      id: "1",
      text: "Man",
      emoji: "🧑",
      x: 0,
      y: 0,
    },
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleDragStart = (e: DragStartEvent) => {};

  const handleDragEnd = (e: DragEndEvent) => {
    const { active } = e;

    if (active.data.current?.type === "playground-element") {
      const element = active.data.current?.element as IPlaygroundElement;
      setPlaygroundElements((elements) =>
        elements.map((el) => {
          if (el.id === element.id) {
            el.x = mouseCoords.x;
            el.y = mouseCoords.y;
          }

          return el;
        }),
      );
    }

    setActiveElement(null);
  };

  useEffect(() => {
    console.log(activeElement);
  }, [activeElement]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex">
        <main className="flex-1">
          <Playground elements={playgroundElements} />
        </main>
        <Sidebar />
      </div>
    </DndContext>
  );
};

export default Home;
