import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { NavBar } from "./navbar";
import { motion } from "framer-motion";

const Company = () => {
  const [company, setCompany] = useState({
    name: "",
    place: "",
    re_com: "",
  });
  const { companyadd } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(company);
    try {
      company.re_com.length > 0 &&
        companyadd(company.name, company.place, company.re_com);
      console.log(company.name);
      console.log(company.re_com);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };
  return (
    <div
      className=" bg-black"
      // flex justify-center items-center
      style={{ height: "100vh" }}
    >
      <NavBar />
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
      <form
        action="post"
        className="flex justify-center w-full items-center bg-black"
        onSubmit={handleSubmit}
      >
        <FlipLink>createnewcompany</FlipLink>
        <div className=" relative h-96 min-w-[277px] w-[40%] bg-[#effef7] rounded-[15px]">
          {/* #fafaf9 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              padding: 10,
            }}
          >
            <label htmlFor="name">name:</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
                backgroundColor: "#effef7",
                // #fafaf9
              }}
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
            <label htmlFor="prename">place:</label>
            <input
              type="text"
              name="place"
              placeholder="place"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
                backgroundColor: "#effef7",
                // #fafaf9
              }}
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
            <label htmlFor="re_com">re_com</label>
            <input
              type="text"
              name="re_com"
              placeholder="re_com"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
                backgroundColor: "#effef7",
                // #fafaf9
              }}
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div
            className=" absolute bg-transparent rounded-bl-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 56,
              boxShadow: "-4px 4px black",
            }}
          ></div>
          <div
            className=" absolute bg-transparent rounded-bl-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 0,
              left: "40%",
              boxShadow: "-4px 4px black",
            }}
          ></div>
          <div className=" absolute bottom-0 flex justify-center items-center bg-black w-[40%] h-14 rounded-tr-[15px]">
            <button
              className="bg-[#325d4b] text-white rounded-[10px]"
              style={{ height: 41, width: "calc( 100% - 15px )" }}
              type="submit"
            >
              <h3 style={{ fontWeight: "bold" }}>Submit</h3>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Company;

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-[115px] m-2"
      style={{
        lineHeight: 1,
      }}
    >
      <div className="">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-110%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "110%",
                filter: "drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))",
              },
              hovered: {
                y: 0,
                filter: "drop-shadow(0px 5px 7px rgba(255, 255, 255, 0.5))",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block  text-[#effef7]"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
