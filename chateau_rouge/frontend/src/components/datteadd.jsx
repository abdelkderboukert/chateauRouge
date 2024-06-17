import { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";
import Select from "react-select";

const Datteadd = () => {
  const [selectedClient, setSelectedClient] = useState({
    prix: 0,
    client: 0,
  });
  const { datteadd } = useContext(AuthContex);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(dattes);
    try {
      console.log("p2");
      dattes.prix.length > 0 && dattes.client.length > 0 && console.log("p1");
      datteadd(dattes.prix, dattes.client);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };
  const [clients, setClient] = useState([]);
  const [dattes, setDettes] = useState({
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
    <div
      style={{
        background: "black",
        height: "100vh",
      }}
    >
      <form method="post" onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <input
              type="text"
              name="prix"
              placeholder="prix"
              onChange={(e) => {
                setDettes({ ...dattes, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Select
              styles={{
                control: (styles) => ({
                  ...styles,
                  height: 40,
                  width: "390%",
                }),
                menu: (styles) => ({ ...styles, width: "390%", maxHeight:"90vh" }),
              }}
              value={selectedClient ? selectedClient.id : ""}
              onChange={(option) => {
                const clientIdv = option ? option.value : null;
                const clientId = clientIdv ? parseInt(option.value, 10) : null;
                const selectedClient = clients.find(
                  (client) => client.id === clientId
                );
                console.log(selectedClient);
                setDettes({ ...dattes, client: selectedClient.id });
                console.log(selectedClient.id);
                setSelectedClient(selectedClient);
              }}
              options={clients.map((client) => ({
                value: client.id,
                label: `${client.name} ${client.prename}`,
              }))}
              isSearchable={true}
              placeholder="Select a client"
            />
          </div>
        </div>
        {selectedClient && (
          <div>
            Selected client: {selectedClient.name} {selectedClient.prename}
          </div>
        )}

        <button type="submit" id="brnn">
          <h3 style={{ fontWeight: "bold"}}>
            Sing up
          </h3>
        </button>
      </form>
    </div>
  );
};

export default Datteadd;
