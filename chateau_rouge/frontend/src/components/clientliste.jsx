import React, { useState, useRef, useEffect } from "react";
import Chartsclient from "./chartsclient";
import axios from "axios";
import CreateClent from "./createClent";
import Company from "./company";

const Clientliste = () => {
  const [showTest2, setShowTest2] = useState(false);
  const [showCreatClient, setShowCreatClient] = useState(false);
  const [showCreatCompany, setShowCreatCompany] = useState(false);
  const [queryclient, setQueryClient] = useState("");
  const [querycompany, setQueryCompany] = useState("");
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
          />
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
          <input
            type="search"
            value={queryclient}
            onChange={handleSearchClient}
            placeholder="Search client"
          />
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
