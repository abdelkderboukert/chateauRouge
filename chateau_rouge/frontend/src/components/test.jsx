import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Test = () => {
  return (
    <>
      <div
        id="searchBar"
        // className="dd"
        style={{
          // display: "flex",
          // flexDirection: "row",
          margin: "10 auto",
          marginTop: 5,
          height: 85,
          width: "100%",
          position: "fixed",
          zIndex: 5,
        }}
      >
        <SlideTabs />
      </div>
      <div
        id="searchBar"
        // className="dd"
        style={{
          display: "flex",
          flexDirection: "row",
          height: 65,
          width: "100%",
        }}
      ></div>
    </>
  );
};

const SlideTabs = () => {
  return (
    <div className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">
      <Tab>
        <Link to="/home" className="nav-link">
          home
        </Link>
      </Tab>
      <Tab>
        <Link to="/datteadd" className="nav-link">
          add datte
        </Link>
      </Tab>
      <Tab>
        <Link to="/companycreate" className="nav-link">
          create company
        </Link>
      </Tab>
      <Tab>
        <Link to="/versadd" className="nav-link">
          add vers
        </Link>
      </Tab>
      <Tab>
        <Link to="/client" className="nav-link">
          client liste
        </Link>
      </Tab>
      <Tab>
        <Link to="/createclient" className="nav-link">
          create client
        </Link>
      </Tab>
      <Tab>
        <Link to="/buying" className="nav-link">
          buying
        </Link>
      </Tab>
      <Tab>
        <Link to="/balit_add" className="nav-link">
          add balit
        </Link>
      </Tab>
    </div>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </div>
  );
};

