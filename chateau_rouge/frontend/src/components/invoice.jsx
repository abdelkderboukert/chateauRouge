// import React,{useState, useEffect} from 'react';
// import axios from 'axios';

// const Invoice = () => {
//     const [clientId, setClientId] = useState("");
//     const [clients, setClient] = useState([]);
    // const [errors, setErrors] = useState({});
//     const [balites, setBalites] = useState([]);
//     const [buying, setBuying] = useState({
//         clients: [],
//         balite: balites
//     });

//     const handleSubmit = async (event) => {
//       event.preventDefault();
//     };

//     useEffect(() => {
//         axios
//         .get("http://127.0.0.1:8000/api/clients/")
//         .then((res) => setClient(res.data))
//         .catch((err) => setErrors(err.response.data));
//     }, [errors]);

//     useEffect(() => {
//       axios
//         .get("http://127.0.0.1:8000/api/balites/")
//         .then((res) => setBalites(res.data))
//         .catch((err) => setErrors(err.response.data));
//     }, [errors]);

//     return (
//       <>
//         <form onSubmit={handleSubmit}>
//           <select
//             multiple
//             value={[clientId]}
//             onChange={(e) => {
//               setBuying({ ...buying, ...clients, clients:[e.target.value] });
//               console.log(buying)
//             }}
//           >
//             <option value="">Select a client</option>
//             {clients.map((client) => (
//               <option key={clients.id} value={client.id}>
//                 {client.name} {client.prename}
//               </option>
//             ))}
//           </select>

//           <select
//             multiple
//             value={balites}
//             onChange={(event) => setBalites(event.target.value)}
//           >
//             <option value="">Select a client</option>
//             {balites.map((balite) => (
//               <option key={balite.id} value={balite.id}>
//                 {balite.name} {balite.color} {balite.color}
//               </option>
//             ))}
//           </select>
//           <button type="submit">Create Buying</button>
//           {buying && <div>Buying created: {buying.id}</div>}
//         </form>
//       </>
//     );
// }

// export default Invoice;
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Invoice = () => {
  const [client, setwClient] = useState();
  const [clients, setClient] = useState([]);
  const [balites, setBalites] = useState([]);
  const [wbalites, setwBalites] = useState([]);
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
      .get("http://127.0.0.1:8000/api/balites/")
      .then((res) => setBalites(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const balitesWithMitrage = balites.map((baliteId) => ({
      balite_id: baliteId,
      mitrage: mitrages[baliteId],
    }));
    console.log(balitesWithMitrage)
    const totalPrice = balitesWithMitrage.reduce((total, item) => {
      const balite = balites.filter((balite) => balite.id === item.balite_id);// Fetch the balite object using item.balite_id to get the prix_vendre;
      return (total + (balite.prix_vendre * item.mitrage));
    }, 0);
    const newBuying = {
      client_id: client,
      balites: balitesWithMitrage,
      ptotal: totalPrice,
    };

    try {
      const response = await axios.post('/api/buying/create/', newBuying);
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
          <option key={clients.id} value={client.id}>
            {client.name} {client.prename}
          </option>
        ))}
      </select>

      <label htmlFor="balites">Balites:</label>
      <select
        id="balites"
        multiple
        onChange={(e) =>
          setwBalites(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
      >
        <option value="">select client</option>
        {clients.map((client) => (
          <option key={clients.id} value={client.id}>
            {client.name} {client.prename}
          </option>
        ))}
      </select>

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
    </form>
  );
};

export default Invoice;
