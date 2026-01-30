import React from "react";
import Element from "./element";

const Sidebar = () => {
  return (
    <div className="h-screen border-l max-w-80 p-4">
      <div className="flex gap-2 flex-wrap">
        <Element
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
        <Element
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
        <Element
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
        <Element
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
        <Element
          element={{
            text: "Car",
            emoji: "🚗",
          }}
        />
        <Element
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
