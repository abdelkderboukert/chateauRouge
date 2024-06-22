// import React, {useState} from 'react';
// import { motion } from "framer-motion";

// const Test2 = () => {
//     const [stat, setStat] = useState(false);
//     const [balit, setBalit] = useState([])
    
//     return (
//       <div
//         style={{
//           display: "grid",
//           placeContent: "center",
//           height: "100vh",
//           gap: "0.8rem",
//           background: "black",
//         }}
//       >
//         <motion.div
//           onClick={() => 
//             {setStat(!stat)
//               setBalit(balit=>[...balit, {id:1,name:"moh"}])
//               console.log(balit)
//             }
//           }
//           layout
//           style={{
//             borderRadius: "10px",
//             backgroundColor: "#f4f4f4f4",
//             height: "50px",
//             width: "250px",
//             marginBottom: "20px",
//             color: "#ffff",
//           }}
//           whileHover={{
//             rotate: "-2.5deg",
//             scale: 1.05,
//             opacity: 0.1,
//           }}
//         >
//           <motion.span 
//           style={{ 
//             opacity: 1,
//           }}
//           whileHover={{
//             opacity: 1,
//           }}
//            >
//             click me
//           </motion.span>
//         </motion.div>
//         {stat && (
//           <motion.div
//             style={{
//               height: 0,
//               width: 0,
//               background: "green",
//             }}
//             initial={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             animate={{
//               height: 250,
//               width: 250,
//               rotate: "180deg",
//               borderRadius: "30px",
//             }}
//             exit={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             variants={{}}
//             transition={{
//               duration: 0.5,
//             }}
//           ></motion.div>
//         )}
//         {/* <motion.div
//           style={{
//             height: 150,
//             width: 150,
//             background: "black",
//           }}
//           initial={{
//             rotate: "0deg",
//           }}
//           animate={{
//             rotate: "180deg",
//           }}
//           exit={{
//             rotate: "0deg",
//           }}
//           variants={{}}
//           transition={{
//             duration:1
//           }}
//         ></motion.div> */}
//       </div>
//     );
// }

// export default Test2;

import React, { useState, useEffect } from "react";
import Chartsclient from "./chartsclient";
import { NavBar } from "./navbar";
import axios from "axios";
// import CreateClent from "./createClent";
// import Company from "./company";
import { motion } from "framer-motion";

const Test2 = () => {
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
    <div className="dd">
      <NavBar />
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
              border: "3px black",
              padding: 10,
              boxShadow:
                "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
            whileFocus={{ scale: 1.1 }}
          />
          {companys &&
            companys.map((company) => (
              <motion.div
                style={{
                  background: "#325d4b", // #bebeff#08c138
                  borderRadius: "15px",
                  margin: "5px 10px",
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  height: "60px",
                  fontSize: 25,
                  fontFamily: "Inter, sans-serif",
                  color: "#bbf7d0",
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
                    background: "#026320", // #026320#cffcd2
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
          className="d-flex justify-content-center"
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
                  background: "#325d4b", // #bebeff#08c138
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
                variants={{ hideen: { opacity: 0 }, show: { opacity: 1 } }}
                whileHover={{
                  scale: 1.02,
                  // height: 200,
                  alignItems: "flex-start",
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
                    background: "#026320", // #bebebf
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
  );
};

export default Test2;
