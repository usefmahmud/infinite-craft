import React from "react";
import Element from "./element";
import SidebarElement from "./sidebar-element";

const Sidebar = () => {
  return (
    <div className="h-screen border-l max-w-80 w-full p-4">
      <div className="flex gap-2 flex-wrap">
        <SidebarElement
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
