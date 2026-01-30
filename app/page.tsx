"use client";

import Element from "@/components/element";
import Sidebar from "@/components/sidebar";
import { IElement } from "@/types/element";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

const Home = () => {
  const [activeElement, setActiveElement] = useState<IElement | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveElement(active.data.current?.element);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveElement(null);
  };

  useEffect(() => {
    console.log(activeElement);
  }, [activeElement]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex">
        <main className="flex-1"></main>
        <Sidebar />
      </div>

      <DragOverlay>
        {activeElement && <Element element={activeElement} />}
      </DragOverlay>
    </DndContext>
  );
};

export default Home;
