import { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";

const Versadd = () => {
  const [selectedClient, setSelectedClient] = useState({
    prix: 0,
    client: 0,
  });
  const { versadd } = useContext(AuthContex);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(verss);
    try {
      console.log("p2");
      verss.prix.length > 0 && verss.client.length > 0 && console.log("p1");
      versadd(verss.prix, verss.client);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };
  const [clients, setClient] = useState([]);
  const [verss, setVerss] = useState({
    id: "",
    prix: 0,
    client: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => setClient(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="prix"
          placeholder="prix"
          onChange={(e) => {
            setVerss({ ...verss, [e.target.name]: e.target.value });
          }}
        />
        <select
          value={selectedClient ? selectedClient.id : ""}
          onChange={(event) => {
            const clientId = parseInt(event.target.value, 10);
            const selectedClient = clients.find(
              (client) => client.id === clientId
            );
            console.log(selectedClient);
            setVerss({ ...verss, client: selectedClient.id });
            console.log(selectedClient.id);
            setSelectedClient(selectedClient);
          }}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={clients.id} value={client.id}>
              {client.name} {client.prename}
            </option>
          ))}
        </select>
        {selectedClient && (
          <div>
            Selected client: {selectedClient.name} {selectedClient.prename}
          </div>
        )}
        <button type="submit" id="brnn">
          <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
        </button>
      </form>
    </div>
  );
};

export default Versadd;
