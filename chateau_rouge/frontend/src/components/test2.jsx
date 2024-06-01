import { useState, useEffect, useLayoutEffect } from "react";
import Charts from "./charts";
import axios from "axios";

const Test2 = () => {
  const [dattes, setDettes] = useState([]);
  const [categories, setcategories] = useState([]);
  const [errors, setErrors] = useState({});
  const data1 = ["11", "32", "45", "32", "34", "52", "41", "20"];
  const data2 = [21, 43, 50, 40, 44, 45, 61, 30];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dattes/")
      .then((res) => {
        setDettes(res.data);
        setcategories(res.data.map((datte) => datte.time)); // Update data state here
      })
      .catch((err) => setErrors(err.response.data));
  }, []);

  useLayoutEffect(() => {
    console.log(categories);
  }, [categories]);

  const finalCategories = categories; // Create a new variable to hold the final categories array

  return (
    <div>
      <Charts id={1} data1={data1} data2={data2} categories={finalCategories} />
      {dattes.map((datte) => (
        <div>
          {datte.time} {datte.id}
        </div>
      ))}
    </div>
  );
};

export default Test2;
