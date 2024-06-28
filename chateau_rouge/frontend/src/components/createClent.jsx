import { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";
import Select from "react-select";
import { NavBar } from "./navbar";

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
    <div className="dd" style={{ minHeight: "100vh" }}>
      <NavBar />
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <form
          method="post"
          style={{
            width: "40%",
            backgroundColor: "#ffffff",
            borderRadius: 25,
            padding: 20,
          }}
          onSubmit={handleSubmit}
        >
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
              }}
              onChange={(e) => {
                setClient({ ...client, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              name="prename"
              placeholder="prename"
              style={{
                margin: "10px 0 10px 0",
                height: 50,
              }}
              onChange={(e) => {
                setClient({ ...client, [e.target.name]: e.target.value });
              }}
            />
            <Select
              styles={{
                control: (styles) => ({
                  ...styles,
                  height: 40,
                  width: "100%",
                }),
                menu: (styles) => ({
                  ...styles,
                  width: "100%",
                  maxHeight: "90vh",
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
              <div>Selected company: {selectedCompany.name}</div>
            )}
          </div>
          <button type="submit" id="brnn" style={{ marginTop: 20 }}>
            <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClent;
