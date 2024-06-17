// import React, {useState} from 'react';
// import { motion } from "framer-motion";

// const Test2 = () => {
//     const [stat, setStat] = useState(false);
//     const [balit, setBalit] = useState([])
    
//     return (
//       <div
//         style={{
//           display: "grid",
//           placeContent: "center",
//           height: "100vh",
//           gap: "0.8rem",
//           background: "black",
//         }}
//       >
//         <motion.div
//           onClick={() => 
//             {setStat(!stat)
//               setBalit(balit=>[...balit, {id:1,name:"moh"}])
//               console.log(balit)
//             }
//           }
//           layout
//           style={{
//             borderRadius: "10px",
//             backgroundColor: "#f4f4f4f4",
//             height: "50px",
//             width: "250px",
//             marginBottom: "20px",
//             color: "#ffff",
//           }}
//           whileHover={{
//             rotate: "-2.5deg",
//             scale: 1.05,
//             opacity: 0.1,
//           }}
//         >
//           <motion.span 
//           style={{ 
//             opacity: 1,
//           }}
//           whileHover={{
//             opacity: 1,
//           }}
//            >
//             click me
//           </motion.span>
//         </motion.div>
//         {stat && (
//           <motion.div
//             style={{
//               height: 0,
//               width: 0,
//               background: "green",
//             }}
//             initial={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             animate={{
//               height: 250,
//               width: 250,
//               rotate: "180deg",
//               borderRadius: "30px",
//             }}
//             exit={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             variants={{}}
//             transition={{
//               duration: 0.5,
//             }}
//           ></motion.div>
//         )}
//         {/* <motion.div
//           style={{
//             height: 150,
//             width: 150,
//             background: "black",
//           }}
//           initial={{
//             rotate: "0deg",
//           }}
//           animate={{
//             rotate: "180deg",
//           }}
//           exit={{
//             rotate: "0deg",
//           }}
//           variants={{}}
//           transition={{
//             duration:1
//           }}
//         ></motion.div> */}
//       </div>
//     );
// }

// export default Test2;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import {motion} from "framer-motion"

const Test2 = () => {
  const [client, setwClient] = useState();
  const [clients, setClient] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => setBalites(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const balitesWithMitrage = wbalites.map((baliteId) => ({
      balite_id: baliteId,
      mitrage: mitrages[baliteId],
    }));
    console.log(balitesWithMitrage)
    console.log(balitesWithMitrage);
    const totalPrice = balitesWithMitrage.reduce((total, item) => {
      const balite = balites.filter((balite) => balite.id === item.balite_id); // Fetch the balite object using item.balite_id to get the prix_vendre;
      return total + balite.prix_vendre * item.mitrage;
    }, 0);
    const newBuying = {
      client_id: client,
      balites: balitesWithMitrage,
      ptotal: totalPrice,
    };

    try {
      const response = await axios.post("/api/buying/create/", newBuying);
      console.log(response);
      // Reset form or show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="client">Client:</label>
      <select id="client" onChange={(e) => setwClient(e.target.value)}>
        <option value="">select client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name} {client.prename}
          </option>
        ))}
      </select>
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

      <button type="submit">Create Buying</button>
      <motion.div
        whileTap={{
          cursor: "pointer",
          "#secondDiv": {
            backgroundColor: "red",
          },
        }}
      >
        First div
      </motion.div>
      <motion.div id="secondDiv">
        Second div
      </motion.div>
    </form>
  );
};

export default Test2;