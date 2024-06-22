import React, { useState, useRef, useEffect } from "react";
import Chartsclient from "./chartsclient";
import axios from "axios";
import { Link } from "react-router-dom";
// import CreateClent from "./createClent";
// import Company from "./company";
import { motion } from "framer-motion";

const Clientliste = () => {
  const [queryclient, setQueryClient] = useState("");
  const [querycompany, setQueryCompany] = useState("");
  const [companys, setCompany] = useState();
  const [clients, setClient] = useState();
  const [errors, setErrors] = useState({});
  const [currentCompanyId, setCurrentCompanyId] = useState(0);
  const [currentClientId, setCurrentClientId] = useState(0);


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
  }, [errors,querycompany]);

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
  }, [errors,currentCompanyId,queryclient]);

  return (
    <div>
      <motion.button
        style={{
          position: "fixed",
          zIndex: 1,
          margin: 20,
          borderRadius: 15,
          opacity: 0.2,
          border: "none",
          backgroundColor: "red",
          color: "white",
        }}
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        <Link to="/home" className="nav-link">
          <h2 className="text-white-50 mx-auto">home</h2>
        </Link>
      </motion.button>
      <Chartsclient id={currentClientId} key={currentClientId} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
        className="div-cont"
      >
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
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
              padding: 10,
              boxShadow:
                "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
          />
          {companys &&
            companys.map((company) => (
              <motion.div
                style={{
                  background: "#F0F8Ff", // #bebeff
                  borderRadius: "15px",
                  margin: "5px 10px",
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  height: "60px",
                }}
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
                key={company.id}
              >
                {company.id} {company.name} {company.place} {company.re_com}
                <button
                  onClick={() => handleIdCompany(company.id)}
                  style={{
                    background: "#1d6efd", // #bebebf
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
                  className="ttt1"
                >
                  click
                </button>
              </motion.div>
            ))}
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            // maxHeight:"300px",
            // overflowY: "scroll",
            // overflowX: "visible"
          }}
          variants={{
            hideen: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25,
                // duration: 5,
              },
            },
          }}
          initial="hideen"
          animate="show"
          className="ttt2"
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
              boxShadow:
                "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
          />
          {companys &&
            clients &&
            clients.map((client) => (
              <motion.div
                style={{
                  background: "#F0F8Ff", // #bebeff
                  borderRadius: "15px",
                  margin: "5px 10px",
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  height: "60px",
                }}
                variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                }}
                // className="d-flex justify-content-center"
                key={client.id}
              >
                {client.id} {client.name} {client.prename} /
                {companys &&
                  companys
                    .filter((company) => company.id === client.campany)
                    .map((company) => (
                      <div key={company.id}>{company.name}</div>
                    ))}
                <button
                  onClick={() => handleIdClient(client.id)}
                  id="vvv"
                  style={{
                    background: "#1d6efd", // #bebebf
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
            ))}
          {!currentCompanyId && (
            <div
              className="d-flex justify-content-center"
              style={{
                width: "100%",
                height: 300,
                alignItems: "center",
              }}
            >
              <h1
                style={{ color: "black", fontWeight: "bold", fontSize: "3rem", opacity:0.1 }}
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
              }}
            >
              <h1>
                {companys
                  .filter((company) => company.id === currentCompanyId)
                  .map((company) => (
                    <div
                      key={company.id}
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "3rem",
                        opacity:0.1
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
  );
};

export default Clientliste;
