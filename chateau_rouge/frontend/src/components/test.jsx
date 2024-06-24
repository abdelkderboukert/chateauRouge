import React, { useState } from "react";
import { motion } from "framer-motion";

export const Test = () => {
  return (
    <>
      <SlideTabs />
    </>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    top: 0,
    opacity: 0,
  });

  const tabs = [
    "home",
    "add datte",
    "create company",
    "add vers",
    "client liste",
    "create client",
    "buying",
    "add balit",
    "home",
    "add datte",
    "create company",
    "add vers",
    "client liste",
    "create client",
    "buying",
    "add balit",
  ];

  const handleTabClick = (index) => {
    setPosition((prevPosition) => ({ ...prevPosition, top: index * 48, opacity:1 }));
    console.log(position.top, index);
  };

  return (
    <div
      className="relative mx-auto bg-white p-1"
      onMouseLeave={() => {
        setPosition((prevPosition) => ({
          ...prevPosition,
          opacity: 0,
        }));
      }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} onMouseEnter={() => handleTabClick(index)}>
          {tab}
        </Tab>
      ))}
      <Cursor position={position} />
    </div>
  );
};

const Tab = ({ children, onClick, onMouseEnter }) => {
  return (
    <div
      className="relative z-10 block cursor-pointer px-3
       py-1.5 h-12 text-xs uppercase text-white mix-blend-difference
        md:px-5 md:py-3 md:text-base"
      style={{ width: 240 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.div
      animate={{ top: position.top, opacity: position.opacity}}
      className="absolute z-0 h-7 w-60 rounded-full bg-black md:h-12"
    />
  );
};