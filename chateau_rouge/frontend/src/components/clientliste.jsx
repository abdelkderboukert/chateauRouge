import React, { useState, useRef, useEffect } from "react";
import Chartsclient from "./chartsclient";
import axios from "axios";
import CreateClent from "./createClent";
import Company from "./company";

const Clientliste = () => {
  const [showTest2, setShowTest2] = useState(false);
  const [showCreatClient, setShowCreatClient] = useState(false);
  const [showCreatCompany, setShowCreatCompany] = useState(false);
  const [companys, setCompany] = useState();
  const [clients, setClient] = useState();
  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(true);
  const [currentCompanyId, setCurrentCompanyId] = useState(0);
  const [currentClientId, setCurrentClientId] = useState(0);
  const statRef = useRef(false);
  const statClientRef = useRef(false);
  const statCompanytRef = useRef(false);

  const handleRenderTest2 = () => {
    setShowTest2((prevShowTest2) => !prevShowTest2);
    statRef.current = !statRef.current;
    console.log(statRef);
  };

  const addClient = () => {
    setShowCreatClient((prevShowClient) => !prevShowClient);
    statClientRef.current = !statClientRef.current;
  };

  const addCompany = () => {
    setShowCreatCompany((prevShowCompany) => !prevShowCompany);
    statCompanytRef.current = !statCompanytRef.current;
  };

  const handleIdCompany = (idCompany) => {
    setCurrentCompanyId(idCompany);
    console.log(currentCompanyId);
  };

  const handleIdClient = (idClient) => {
    setCurrentClientId(idClient);
    console.log(currentClientId);
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/camanies/")
      .then((res) => {
        setCompany(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        // setLoading(false);
      });
  }, [errors]);

  useEffect(() => {
    // setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/clients/")
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
  }, [errors,currentCompanyId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Chartsclient id={currentClientId} key={currentClientId} />{/*  */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
          {companys &&
            companys.map((company) => (
              <div key={company.id}>
                {company.id} {company.name} {company.place} {company.re_com}{" "}
                <button
                  onClick={() => handleIdCompany(company.id)}
                  style={{ background: "red" }}
                >
                  click
                </button>
              </div>
            ))}
          {statCompanytRef.current && <Company />}
          <button onClick={addCompany}>add client</button>
        </div>
        {console.log(clients)}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          {companys &&
            clients &&
            clients.map((client) => (
              <div key={client.id}>
                {client.id} {client.name} {client.prename}
                {companys &&
                  companys
                    .filter((company) => company.id === client.campany)
                    .map((company) => (
                      <div key={company.id}>{company.name}</div>
                    ))}
                <button
                  onClick={() => handleIdClient(client.id)}
                  style={{ background: "green" }}
                >
                  click
                </button>
              </div>
            ))}
          {statClientRef.current && <CreateClent />}
          <button onClick={addClient}>add client</button>
        </div>
      </div>
      <button onClick={handleRenderTest2}>Render Test2</button>
    </div>
  );
};

export default Clientliste;
