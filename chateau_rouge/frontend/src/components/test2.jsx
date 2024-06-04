import { useState, useEffect } from "react";
import Charts from "./charts";
import axios from "axios";

const Test2 = ({id}) => {
  // const [dattes, setDettes] = useState([]);
  // const [verss, setVerss] = useState([]);
  const [categories, setcategories] = useState([]);
  const [categoriesvers, setcategoriesvers] = useState([]);
  const [data, setdata] = useState([]);
  const [datavers, setdatavers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true); // Add a loading state
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dattes/")
      .then((res) => {
        const filteredDattes = res.data.filter((datte) => datte.client === id);
        // setDettes(filteredDattes);
        setcategories(filteredDattes.map((datte) => datte.time));
        setdata(filteredDattes.map((datte) => datte.prix));
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors, id]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vers/")
      .then((res) => {
        const filteredVerss = res.data.filter((vers) => vers.client === id);
        // setVerss(filteredVerss);
        setcategoriesvers(filteredVerss.map((vers) => vers.time));
        setdatavers(filteredVerss.map((vers) => vers.prix));
        setLoading1(false); // Set loading to false when data is received
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors, id]);

  if (loading&&loading1) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  const finalCategories = categories;
  const finalCategoriesvers = categoriesvers;
  console.log(categoriesvers, datavers);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Charts
        id={1}
        data1={data}
        categories={finalCategories}
        title="datte"
      />
      <Charts
        id={2}
        data1={datavers}
        categories={finalCategoriesvers}
        title="vers"
      />
      {/* dettes
      {dattes.map((datte) => (
        <div key={datte.id}>
          {datte.time} {datte.id} {datte.client}
        </div>
      ))}
      vers
      {verss.map((vers) => (
        <div
          key={vers.id}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {vers.time} {vers.id} {vers.client}
        </div>
      ))} */}
    </div>
  );
};

export default Test2;