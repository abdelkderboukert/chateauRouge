import React, { useState, useRef, useEffect } from "react";
import Chartsclient from "./chartsclient";
import axios from "axios";
// import CreateClent from "./createClent";
// import Company from "./company";
import { motion } from "framer-motion";

const Clientliste = () => {
  // const [showTest2, setShowTest2] = useState(false);
  // const [showCreatClient, setShowCreatClient] = useState(false);
  // const [showCreatCompany, setShowCreatCompany] = useState(false);
  const [queryclient, setQueryClient] = useState("");
  const [querycompany, setQueryCompany] = useState("");
  const [companys, setCompany] = useState();
  const [clients, setClient] = useState();
  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(true);
  const [currentCompanyId, setCurrentCompanyId] = useState(0);
  const [currentClientId, setCurrentClientId] = useState(0);
  // const statRef = useRef(false);
  // const statClientRef = useRef(false);
  // const statCompanytRef = useRef(false);

  // const handleRenderTest2 = () => {
  //   setShowTest2((prevShowTest2) => !prevShowTest2);
  //   statRef.current = !statRef.current;
  //   console.log(statRef);
  // };

  // const addClient = () => {
  //   setShowCreatClient((prevShowClient) => !prevShowClient);
  //   statClientRef.current = !statClientRef.current;
  // };

  // const addCompany = () => {
  //   setShowCreatCompany((prevShowCompany) => !prevShowCompany);
  //   statCompanytRef.current = !statCompanytRef.current;
  // };

  const handleIdCompany = (idCompany) => {
    setCurrentCompanyId(idCompany);
    console.log(currentCompanyId);
  };

  const handleIdClient = (idClient) => {
    setCurrentClientId(idClient);
    console.log(currentClientId);
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Chartsclient id={currentClientId} key={currentClientId} />
      {/*  */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
        className="div-cont"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <input
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
                // className="d-flex justify-content-center"
                key={company.id}
              >
                {company.id} {company.name} {company.place} {company.re_com}
                <button
                  onClick={() => handleIdCompany(company.id)}
                  style={{
                    background: "#1d6efd", // #bebebf
                    position: "absolute",
                    left: 550,
                    border: "none",
                    height: 35,
                    width: 90,
                    borderRadius: 5,
                    boxShadow:
                      "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                  }}
                >
                  click
                </button>
              </motion.div>
            ))}
          {/* {statCompanytRef.current && <Company />}
          <motion.button onClick={addCompany} layout>
            add client
          </motion.button> */}
        </div>
        {console.log(clients)}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            // maxHeight:"200px",
            // overflowY: "scroll",
          }}
        >
          <input
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
                    position: "absolute",
                    right: 30,
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
              <h1 style={{ color: "#F8F8Ff" }}>no company selected</h1>
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
                    <div key={company.id} style={{ color: "#F8F8Ff" }}>
                      {company.name} desn't has client{" "}
                    </div>
                  ))}
              </h1>
            </div>
          )}
          {/* {statClientRef.current && <CreateClent />}
          <motion.button onClick={addClient} layout>
            add client
          </motion.button> */}
        </div>
      </div>
    </div>
  );
};

export default Clientliste;
