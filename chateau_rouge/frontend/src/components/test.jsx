import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Chartsclient from "./chartsclient";
import { NavBar } from "./navbar";

const Test = () => {
  const [queryclient, setQueryClient] = useState("");
  const [querycompany, setQueryCompany] = useState("");
  const [companys, setCompany] = useState();
  const [clients, setClient] = useState();
  const [errors, setErrors] = useState({});
  const [currentCompanyId, setCurrentCompanyId] = useState(0);
  const [currentClientId, setCurrentClientId] = useState(0);

  const [position, setPosition] = useState({
    top: 0,
    opacity: 0,
  });
  const [position1, setPosition1] = useState({
    top: 0,
    opacity: 0,
  });
  const handleTabClick = (index) => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      top: 65 + 75 * index,
      opacity: 1,
    }));
  };

  const handleTabClick1 = (index) => {
    setPosition1((prevPosition1) => ({
      ...prevPosition1,
      top: 65 + 75 * index,
      opacity: 1,
    }));
  };

  const handleIdCompany = (idCompany) => {
    setCurrentCompanyId(idCompany);
  };

  const handleIdClient = (idClient) => {
    setCurrentClientId(idClient);
  };

  const handleSearchClient = (event) => {
    setQueryClient(event.target.value);
  };

  const handleSearchCompany = (event) => {
    setQueryCompany(event.target.value);
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`http://localhost:8000/api/camanies/?q=${querycompany}`)
      .then((res) => {
        setCompany(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        // setLoading(false);
      });
  }, [errors, querycompany]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/api/clients/?q=${queryclient}`)
        .then((res) => {
          const filteredclient = res.data.filter(
            (client) => client.campany === currentCompanyId
          );
          setClient(filteredclient);
          // setLoading(false);
        })
        .catch((err) => {
          setErrors(err.response.data);
          // setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [errors, currentCompanyId, queryclient]);
  return (
    <div style={{ backgroundColor: "black" }}>
      <NavBar />
      <Chartsclient id={currentClientId} key={currentClientId} />
      <div
        style={{
          // display: "flex",
          // flexDirection: "row",
          height: "100%",
          border: "black 1px",
          backgroundColor: "white",
          borderRadius: "40px 50px 0 0",
        }}
        className="div-cont"
      >
        <div
          style={{
            height: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>jhh</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              position: "",
              flexDirection: "column",
              width: "50%",
              minHeight: `calc(100vh - 60px)`,
            }}
            className="relative "
            variants={{
              hideen: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 20,
                  // duration: 5,
                },
              },
            }}
            initial="hideen"
            animate="show"
            onMouseLeave={() => {
              setPosition((prevPosition) => ({
                ...prevPosition,
                opacity: 0,
              }));
            }}
          >
            <motion.input
              type="search"
              value={querycompany}
              onChange={handleSearchCompany}
              placeholder="Search company"
              style={{
                height: "40px",
                margin: "10px",
                borderRadius: "5px",
                border: "3px white",
                padding: 10,
                boxShadow:
                  "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
              }}
              variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
              className="ddd relative z-10 block cursor-pointer px-3
                py-1.5 h-12 text-xs uppercase mix-blend-difference
                md:px-5 md:py-3 md:text-base"
            />
            {companys &&
              companys.map((company, index) => (
                <>
                  <motion.div
                    style={{
                      // background: "#325d4b", // #bebeff#08c138
                      borderRadius: "15px",
                      margin: "5px 10px",
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                      height: "60px",
                      fontSize: 25,
                      fontFamily: "Inter, sans-serif",
                      border: "1px solid black",
                      // color: "#bbf7d0",
                    }}
                    className="ddd relative z-10 block cursor-pointer px-3
                    py-1.5 h-12 text-xs uppercase text-white mix-blend-difference isolate
                    md:px-5 md:py-3 md:text-base"
                    onMouseEnter={() => handleTabClick(index)}
                    whileHover={{
                      boxShadow:
                        "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                      scale: 1.02,
                    }}
                    variants={{
                      hideen: { opacity: 0 },
                      show: { opacity: 1 },
                      transition: {
                        // staggerChildren: 20,
                        duration: 5,
                      },
                    }}
                    // className="d-flex justify-content-center"
                    key={index}
                  >
                    {company.id} {company.name} {company.place} {company.re_com}
                    <button
                      onClick={() => handleIdCompany(company.id)}
                      style={{
                        background: "", // #026320#026320
                        // position: "absolute",
                        // left: 550,
                        marginLeft: "auto",
                        float: "right",
                        border: "none",
                        height: 35,
                        width: 90,
                        borderRadius: 5,
                        boxShadow:
                          "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                      }}
                      className="uppercase text-white mix-blend-difference
                  md:px-5 md:py-3 md:text-base border-black bg-black"
                    >
                      click
                    </button>
                  </motion.div>
                  <div
                    style={{
                      width: "50%",
                      margin: "0 auto",
                      height: 5,
                      backgroundColor: "#ccc",
                      borderRadius: 5,
                    }}
                  />
                </>
              ))}
            <Cursor position={position} />
          </motion.div>
          <motion.div
            style={{
              display: "flex",
              position: "",
              flexDirection: "column",
              width: "50%",
              minHeight: `calc(100vh - 60px)`,
            }}
            className="relative "
            variants={{
              hideen: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 20,
                  // duration: 5,
                },
              },
            }}
            initial="hideen"
            animate="show"
            onMouseLeave={() => {
              setPosition1((prevPosition1) => ({
                ...prevPosition1,
                opacity: 0,
              }));
            }}
          >
            <motion.input
              type="search"
              value={queryclient}
              onChange={handleSearchClient}
              placeholder="Search client"
              style={{
                height: "40px",
                margin: "10px",
                borderRadius: "5px",
                padding: 10,
                justifySelf: "flex-start",
                boxShadow:
                  "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
              }}
              className="ddd relative z-10 block cursor-pointer px-3
                py-1.5 h-12 text-xs uppercase  mix-blend-difference
                md:px-5 md:py-3 md:text-base"
              variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
            />
            {companys &&
              clients &&
              clients.map((client, index) => (
                <>
                  <motion.div
                    style={{
                      // background: "#325d4b", // #bebeff#08c138
                      borderRadius: "15px",
                      margin: "5px 10px",
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",
                      height: "60px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 25,
                      color: "#bbf7d0",
                    }}
                    className="relative z-10 block cursor-pointer px-3
                      py-1.5 h-12 text-xs uppercase text-white mix-blend-difference
                      md:px-5 md:py-3 md:text-base border border-black"
                    onMouseEnter={() => handleTabClick1(index)}
                    
                    variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
                    whileHover={{
                      scale: 1.02,
                      // height: 200,
                      alignItems: "flex-start",
                      boxShadow:
                        "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                    }}
                    // className="d-flex justify-content-center"
                    key={index}
                  >
                    {client.id} {client.name} {client.prename} /
                    {companys &&
                      companys
                        .filter((company) => company.id === client.campany)
                        .map((company) => (
                          <div
                            key={company.id}
                            style={{
                              color: "",
                              fontFamily: "Inter, sans-serif",
                              fontSize: 25,
                            }}
                          >
                            {company.name}
                          </div>
                        ))}
                    <button
                      onClick={() => handleIdClient(client.id)}
                      id="vvv"
                      style={{
                        // background: "#026320", // #bebebf
                        // position: "absolute",
                        // right: 30,
                        marginLeft: "auto",
                        float: "right",
                        border: "none",
                        height: 35,
                        width: 90,
                        borderRadius: 5,
                        boxShadow:
                          "0 8px 10px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                      }}
                    >
                      click
                    </button>
                  </motion.div>
                  <div
                    style={{
                      width: "50%",
                      margin: "0 auto",
                      height: 5,
                      backgroundColor: "#ccc",
                      borderRadius: 5,
                    }}
                  />
                </>
              ))}
            <Cursor position={position1} />
            {!currentCompanyId && (
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  height: 300,
                  alignItems: "center",
                  color: "#325d4b",
                }}
              >
                <h1
                  style={{
                    color: "#325d4b",
                    opacity: 0.1,
                    fontWeight: "bold",
                    fontSize: "3rem",
                  }}
                >
                  no company selected.
                </h1>
              </div>
            )}
            {currentCompanyId && !clients[0] && (
              <div
                className="d-flex justify-content-center"
                style={{
                  width: "100%",
                  height: 300,
                  alignItems: "center",
                  color: "#325d4b",
                }}
              >
                <h1>
                  {companys
                    .filter((company) => company.id === currentCompanyId)
                    .map((company) => (
                      <div
                        key={company.id}
                        style={{
                          color: "#325d4b",
                          opacity: 0.1,
                          fontWeight: "bold",
                          fontSize: "3rem",
                        }}
                      >
                        {company.name} desn't has client.
                      </div>
                    ))}
                </h1>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const Cursor = ({ position }) => {
  return (
    <motion.div
      animate={{ top: position.top, opacity: position.opacity }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
      style={{
        background: "#325d4b", // #bebeff#08c138
        borderRadius: "15px",
        // margin: "5px 10px",
        height: "60px",
        width: "100%",
      }}
    />
  );
};

export default Test;
