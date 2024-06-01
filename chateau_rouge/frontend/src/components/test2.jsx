import { useState, useEffect } from "react";
import Charts from "./charts";
import axios from "axios";

const Test2 = () => {
  const [dattes, setDettes] = useState([]);
  const [verss, setVerss] = useState([]);
  const [categories, setcategories] = useState([]);
  const [categoriesvers, setcategoriesvers] = useState([]);
  const [data, setdata] = useState([]);
  const [datavers, setdatavers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state
  const data2 = [21, 43, 50, 40, 44, 45, 61, 30];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dattes/")
      .then((res) => {
        setDettes(res.data);
        setcategories(res.data.map((datte) => datte.time));
        setdata(res.data.map((datte) => datte.prix));
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vers/")
      .then((res) => {
        setVerss(res.data);
        setcategoriesvers(res.data.map((ver) => ver.time));
        setdatavers(res.data.map((ver) => ver.prix));
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  const finalCategories = categories;
  const finalCategoriesvers = categoriesvers;
  return (
    <div>
      <Charts id={1} data1={data} data2={data2} categories={finalCategories} />
      <Charts
        id={2}
        data1={datavers}
        data2={data2}
        categories={finalCategoriesvers}
      />
      {dattes.map((datte) => (
        <div key={datte.id}>
          {datte.time} {datte.id} {datte.client}
        </div>
      ))}
      {verss.map((vers) => (
        <div key={vers.id}>
          {vers.time} {vers.id} {vers.client}
        </div>
      ))}
    </div>
  );
};

export default Test2;