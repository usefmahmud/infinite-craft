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
import { combineElements } from "@/services/combine-elements";

const Home = () => {
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [activeElement, setActiveElement] = useState<IElement | null>(null);

  const [playgroundElements, setPlaygroundElements] = useState<
    IPlaygroundElement[]
  >([]);

  const [sidebarElements, setSidebarElements] = useState<IElement[]>([
    {
      text: "Water",
      emoji: "💧",
    },
    {
      text: "Fire",
      emoji: "🔥",
    },
    {
      text: "Wind",
      emoji: "💨",
    },
    {
      text: "Earth",
      emoji: "🌍",
    }
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

    // combining playground elements or sidebar element to playground element
    if (
      (active.data.current?.type === "playground-element" &&
        over?.data.current?.type === "playground-element") ||
      (active.data.current?.type === "sidebar-element" &&
        over?.data.current?.type === "playground-element")
    ) {
      console.log(active.data.current, over.data.current);
      combineElements(
        active.data.current.element.text,
        over?.data.current.element.text,
      ).then((data) => {
        const element1 = active.data.current?.element as IPlaygroundElement;
        const element2 = over?.data.current?.element as IPlaygroundElement;

        const newElement: IPlaygroundElement = {
          id: uuid4(),
          text: data.text,
          emoji: data.emoji,
          x: element2.x,
          y: element2.y,
        };

        setPlaygroundElements((prev) => [
          ...prev.filter(
            (el) => el.id !== element2.id && el.id !== element1.id,
          ),
          newElement,
        ]);

        setSidebarElements((prev) => [
          ...prev,
          { text: data.text, emoji: data.emoji },
        ]);
      });
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
