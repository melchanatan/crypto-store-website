"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const HiddenContainer = ({ children, title }) => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="flex flex-col overflow-hidden">
      <button
        className="flex gap-2 justify-between items-center font-prompt text-xl border-b-[1px] border-gray-600 uppercase py-1"
        onClick={() => setIsShowing(!isShowing)}
      >
        {title}{" "}
        <IoIosArrowDown
          className="transition-all duration-200"
          style={{ rotate: isShowing ? "180deg" : "0deg" }}
        />
      </button>
      <span
        className="transition-all duration-200"
        style={{
          height: isShowing ? "auto" : 0,
          marginTop: isShowing ? 10 : 0,
          marginBottom: isShowing ? 10 : 0,
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default HiddenContainer;
