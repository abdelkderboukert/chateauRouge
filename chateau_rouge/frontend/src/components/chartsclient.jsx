import { useState, useEffect } from "react";
import Charts from "./charts";
import axios from "axios";

const Chartsclient = ({id}) => {
  const [categories, setcategories] = useState([]);
  const [categoriesvers, setcategoriesvers] = useState([]);
  const [data, setdata] = useState([]);
  const [datavers, setdatavers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading1, setLoading1] = useState(true);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dattes/")
      .then((res) => {
        const filteredDattes = res.data.filter((datte) => datte.client === id);
        setcategories(filteredDattes.map((datte) => datte.time));
        setdata(filteredDattes.map((datte) => datte.prix));
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors, id]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vers/")
      .then((res) => {
        const filteredVerss = res.data.filter((vers) => vers.client === id);
        setcategoriesvers(filteredVerss.map((vers) => vers.time));
        setdatavers(filteredVerss.map((vers) => vers.prix));
        setLoading1(false);
      })
      .catch((err) => setErrors(err.response.data));
  }, [errors, id]);

  const finalCategories = categories;
  const finalCategoriesvers = categoriesvers;
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
    </div>
  );
};

export default Chartsclient;