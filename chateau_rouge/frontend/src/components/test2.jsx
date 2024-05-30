import { useContext, useState, useEffect } from "react";
import Charts from "./charts";
// const AuthContext = lazy(() => import("../context/AuthContext"));
import AuthContex from "../context/AuthContext";
// import useAxios from "../utils/useAxios";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Test2 = () => {
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
        console.log("p2")
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
    <div>
      <Charts
        id={1}
        data1={[11, 32, "45", 32, 34, 52, 41, 20]}
        data2={[]}
        categories={[]}
      />
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => {
            setClient({ ...client, [e.target.name]: e.target.value });
          }}
        />
        <input
          type="text"
          name="prename"
          placeholder="prename"
          onChange={(e) => {
            setClient({ ...client, [e.target.name]: e.target.value });
          }}
        />
        <select
          value={selectedCompany ? selectedCompany.id : ""}
          onChange={(event) => {
            const companyId = parseInt(event.target.value, 10);
            const selectedCompany = companys.find(
              (company) => company.id === companyId
            );
            console.log(selectedCompany)
            setClient({ ...client, camany: selectedCompany });
            setSelectedCompany(selectedCompany)
          }}
        >
          <option value="">Select a company</option>
          {companys.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {selectedCompany && <div>Selected company: {selectedCompany.name}</div>}
        <button type="submit" id="brnn">
          <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
        </button>
      </form>
    </div>
  );
};

export default Test2;
