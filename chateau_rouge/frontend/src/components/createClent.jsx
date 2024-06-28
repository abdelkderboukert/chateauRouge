import React, { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";
import Select from "react-select";
import { NavBar } from "./navbar";
import { motion } from "framer-motion";

const CreateClent = () => {
  const [selectedCompany, setSelectedCompany] = useState({
    id: "",
    name: "",
    place: "",
    re_com: "",
  });
  const [client, setClient] = useState({
    name: "",
    prename: "",
    camany: {
      id: "",
      name: "",
      place: "",
      re_com: "",
    },
  });
  const { clientadd } = useContext(AuthContex);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(client);
    try {
      console.log("p2");
      client.camany.id.length > 0 &&
        client.name.length > 0 &&
        console.log("p1");
      clientadd(client.name, client.prename, client.camany);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };
  const [companys, setCompany] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/camanies/")
      .then((res) => setCompany(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);
  return (
    <div
      className=" bg-black"
      // flex justify-center items-center
      style={{ height: "100vh" }}
    >
      <NavBar />

      <form
        action="post"
        className="flex justify-center w-full items-center bg-black"
        onSubmit={handleSubmit}
      >
        <FlipLink>createnewclient</FlipLink>
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
                setClient({ ...client, [e.target.name]: e.target.value });
              }}
            />
            <label htmlFor="prename">prename:</label>
            <input
              type="text"
              name="prename"
              placeholder="prename"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
                backgroundColor: "#effef7",
                // #fafaf9
              }}
              onChange={(e) => {
                setClient({ ...client, [e.target.name]: e.target.value });
              }}
            />
            <label htmlFor="">company:</label>
            <Select
              styles={{
                control: (styles) => ({
                  ...styles,
                  height: 40,
                  width: "100%",
                  backgroundColor: "#effef7",
                  // #fafaf9
                }),
                menu: (styles) => ({
                  ...styles,
                  width: "100%",
                  maxHeight: "90vh",
                  backgroundColor: "#effef7",
                  // #fafaf9
                }),
              }}
              value={selectedCompany ? selectedCompany.id : ""}
              onChange={(selectedOption) => {
                const selectedCompany = companys.find(
                  (company) => company.id === selectedOption.value
                );
                console.log(selectedCompany);
                setClient({ ...client, camany: selectedCompany });
                setSelectedCompany(selectedCompany);
              }}
              options={companys.map((company) => ({
                value: company.id,
                label: `${company.name}`,
              }))}
              isSearchable={true}
              placeholder="Select a company"
            />
            {selectedCompany && (
              <div className="absolute flex justify-center items-center left-[40%] bottom-[0px] h-14 w-[60%] p-3">
                {" "}
                <h1> Selected company: {selectedCompany.name}</h1>
              </div>
            )}
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
              <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateClent;

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl m-2"
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
