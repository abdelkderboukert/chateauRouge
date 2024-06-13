import React, { useState, useEffect, useContext } from "react";
import  Select  from "react-select";
import AuthContex from "../context/AuthContext";
import axios from "axios";

const Invoice = () => {
  const [client, setwClient] = useState();
  const [clients, setClient] = useState([]);
  const [queryBalites, setQueryBalites] = useState("");
  const [balites, setBalites] = useState([]);
  const [wbalites, setwBalites] = useState([]); // store the selected balite IDs
  const [mitrages, setMitrages] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => setClient(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  const handleSearchBalites = (event) => {
    setQueryBalites(event.target.value);
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/api/balites/?q=${queryBalites}`)
        .then((res) => {
          setBalites(res.data);
          // setLoading(false);
        })
        .catch((err) => {
          setErrors(err.response.data);
          // setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [errors, queryBalites]);

  const { buyingadd } = useContext(AuthContex);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const balitesWithMitrage = wbalites.map((baliteId) => ({
      balite_id: baliteId,
      mitrage: mitrages[baliteId],
    }));

    const totalPrice = balitesWithMitrage.reduce((total, item) => {
      const balite = balites.find((balite) => balite.id === item.balite_id); // Fetch the balite object using item.balite_id to get the prix_vendre;
      return total + balite.prix_vendre * parseFloat(item.mitrage);
    }, 0);

    const ids_b = balitesWithMitrage.map((item) => item.balite_id);
    try {
      client > 0 && totalPrice > 0
      buyingadd(client, ids_b, totalPrice);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="client">Client:</label>
      <Select
        value={client}
        onChange={(e) => setwClient(e.value)}
        options={clients.map((client) => ({
          value: client.id,
          label: `${client.name} ${client.prename}`,
        }))}
        isSearchable={true}
        placeholder="Select a client"
      />
      <label>Balites:</label>
      <input
        type="search"
        value={queryBalites}
        onChange={handleSearchBalites}
        placeholder="Search company"
      />
      <ul>
        {balites.map((balite) => (
          <li key={balite.id}>
            <input
              type="checkbox"
              id={`balite-${balite.id}`}
              value={balite.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setwBalites([...wbalites, balite.id]);
                } else {
                  setwBalites(wbalites.filter((id) => id !== balite.id));
                }
              }}
            />
            <label htmlFor={`balite-${balite.id}`}>{balite.name}</label>
          </li>
        ))}
      </ul>

      {wbalites.map((baliteId) => (
        <div key={baliteId}>
          <label htmlFor={`mitrage-${baliteId}`}>
            Mitrage for Balite {baliteId}:
          </label>
          <input
            type="number"
            id={`mitrage-${baliteId}`}
            key={baliteId}
            onChange={(e) =>
              setMitrages({ ...mitrages, [baliteId]: e.target.value })
            }
          />
        </div>
      ))}
      <div>
        total pric: <span style={{ color: "red" }}>ok</span>
      </div>

      <button type="submit">Create Buying</button>
    </form>
  );
};

export default Invoice;
