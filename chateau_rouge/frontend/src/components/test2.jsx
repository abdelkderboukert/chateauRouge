import { useContext, useState, useEffect } from "react";
import Charts from "./charts";
// const AuthContext = lazy(() => import("../context/AuthContext"));
import AuthContex from "../context/AuthContext";
// import useAxios from "../utils/useAxios";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Test2 = () => {
  const [client, setClient] = useState({
    name: "",
    prename: "",
    company: 0,
  });
    const { clientadd } = useContext(AuthContex);
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(client);
      try {
        client.company.length > 0 &&
          client.name.length > 0 &&
          clientadd(client.name, client.prename, client.company);
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
    }, []);
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
          value={client.company}
          onChange={(e) => {
            setClient({ ...client, company: e.target.value });
          }}
        >
          <option value="">Select a company</option>
          {companys.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button type="submit" id="brnn">
          <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
        </button>
      </form>
    </div>
  );
};

export default Test2;
