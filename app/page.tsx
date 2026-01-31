"use client";

import Element from "@/components/elements/element";
import Playground from "@/components/areas/playground";
import Sidebar from "@/components/areas/sidebar";
import { IElement, IPlaygroundElement } from "@/types/element";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { randomUUID } from "crypto";
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

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
    {
      id: "2",
      text: "Woman",
      emoji: "👩",
      x: 100,
      y: 0,
    },
  ]);

  const [sidebarElements, setSidebarElements] = useState<IElement[]>([
    {
      text: "Car",
      emoji: "🚗",
    },
    {
      text: "Bike",
      emoji: "🚲",
    },
    {
      text: "Airplane",
      emoji: "✈️",
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
    const { active, over } = e;

    // combining playground elements
    if (
      active.data.current?.type === "playground-element" &&
      over?.data.current?.type === "playground-element"
    ) {
      console.log(active.data.current, over.data.current);
    }

    // adding new element from sidebar to playground
    if (
      active.data.current?.type === "sidebar-element" &&
      over?.data.current?.type === "playground"
    ) {
      const element = active.data.current.element as IElement;
      const newPlaygroundElement: IPlaygroundElement = {
        ...element,
        id: uuid4(),
        x: mouseCoords.x,
        y: mouseCoords.y,
      };
      setPlaygroundElements((prev) => [...prev, newPlaygroundElement]);
    }

    // moving existing playground element
    if (
      active.data.current?.type === "playground-element" &&
      over?.data.current?.type === "playground"
    ) {
      const elementId = active.id;
      setPlaygroundElements((prev) =>
        prev.map((el) =>
          el.id === elementId
            ? { ...el, x: mouseCoords.x, y: mouseCoords.y }
            : el,
        ),
      );
    }

    // moving playground element to sidebar (deleting it)
    if (
      active.data.current?.type === "playground-element" &&
      over?.data.current?.type === "sidebar"
    ) {
      const elementId = active.id;
      setPlaygroundElements((prev) => prev.filter((el) => el.id !== elementId));
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
        <Sidebar elements={sidebarElements} />
      </div>
    </DndContext>
  );
};

export default Home;
