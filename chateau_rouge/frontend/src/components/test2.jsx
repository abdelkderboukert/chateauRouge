import { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";
import Select from "react-select";
import { NavBar } from "./navbar";
import { motion } from "framer-motion";

const Test2 = () => {
  const [client, setwClient] = useState();
  const [clients, setClient] = useState([]);
  const [queryBalites, setQueryBalites] = useState("");
  const [balites, setBalites] = useState([]);
  const [wbalites, setwBalites] = useState([]); // store the selected balite IDs
  const [mitrages, setMitrages] = useState({});
  const [errors, setErrors] = useState({});
  const [totalPricec, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => setClient(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);

  const handleSearchBalites = (event) => {
    setQueryBalites(event.target.value);
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/api/balites/?q=${queryBalites}`)
        .then((res) => {
          setBalites(res.data);
          // setLoading(false);
        })
        .catch((err) => {
          setErrors(err.response.data);
          // setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [errors, queryBalites]);

  const { buyingadd } = useContext(AuthContex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const balitesWithMitrage = wbalites.map((baliteId) => ({
      balite_id: baliteId,
      mitrage: mitrages[baliteId],
    }));

    const totalPrice = balitesWithMitrage.reduce((total, item) => {
      const balite = balites.find((balite) => balite.id === item.balite_id); // Fetch the balite object using item.balite_id to get the prix_vendre;
      return total + balite.prix_vendre * parseFloat(item.mitrage);
    }, 0);
    
    setTotalPrice(totalPrice);
    const ids_b = balitesWithMitrage.map((item) => item.balite_id);
    try {
      client > 0 && totalPrice > 0;
      buyingadd(client, ids_b, totalPrice);
      // Clear the total and the checked balites
      setTotalPrice(0);
      setwBalites([]);
      // Uncheck all checkbox elements
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }

  };
  return (
    <div
      className=" bg-black"
      // flex justify-center items-center
      style={{ height: "100vh" }}
    >
      <NavBar />

      <form
        onSubmit={handleSubmit}
        className="flex justify-center h-full w-full items-center bg-black"
      >
        {/* <FlipLink>create_bon</FlipLink> */}
        <div className="relative h-[95%] w-[95%] bg-[#effef7] rounded-[15px] p-3">
          <div
            className=" absolute bg-transparent top-0 rounded-tl-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 0,
              left: "89.95%",
              boxShadow: "-4px -4px black",
            }}
          />
          <div
            className=" absolute bg-transparent top-0 rounded-tr-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 0,
              left: "9%",
              boxShadow: "4px -4px black",
            }}
          />
          <div
            className=" absolute bg-transparent bottom-0 rounded-bl-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 0,
              left: "40%",
              boxShadow: "-3.8px 4px black",
            }}
          />
          <div
            className=" absolute bg-transparent rounded-bl-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 64,
              left: 0,
              boxShadow: "-4px 4px black",
            }}
          />
          <div className=" absolute top-0 left-[10%] flex justify-center items-center bg-black w-[80%] h-14 rounded-b-[40px]"></div>
          <div className=" absolute bottom-0 left-0 flex justify-center items-center bg-black w-[40%] h-16 rounded-tr-[15px]">
            <button
              className="bg-[#325d4b] text-white rounded-[10px]"
              style={{ height: 44, width: "calc( 100% - 15px )" }}
              type="submit"
            >
              <h3 style={{ fontWeight: "bold" }}>Submit</h3>
            </button>
          </div>
          {/* *******************************************************************************
          ************************************************************************************
          *************************************************************************************
          ************************************************************************************ */}
          <div className=" absolute bottom-0 left-[40%] flex justify-start items-center w-[59%] h-16 whitespace-nowrap text-[18px] font-black uppercase sm:text-xl overflow-hidden md:text-xl lg:text-2xl px-4 border-[3px] border-black rounded-[15px] m-1">
            Total prix : <span style={{ color: "red" }}>{totalPricec}</span>DA
            <button
              onClick={() => {
                setTotalPrice(0);
                setwBalites([]);
                setMitrages({});
                const checkboxes = document.querySelectorAll(
                  'input[type="checkbox"]'
                );
                checkboxes.forEach((checkbox) => {
                  checkbox.checked = false;
                });
              }}
            >
              Reset
            </button>
          </div>
          <div
            id="searchBar"
            // className="dd"
            style={{
              display: "flex",
              flexDirection: "row",
              height: 65,
              width: "100%",
            }}
          ></div>
          <label htmlFor="client">Client:</label>
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
          <input
            type="search"
            value={queryBalites}
            onChange={handleSearchBalites}
            placeholder="Search company"
          />
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
                      const newTotalPrice =
                        totalPricec -
                        balite.prix_vendre * (mitrages[balite.id] || 0);
                      setTotalPrice(newTotalPrice);
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
                min="0"
                onChange={(e) => {
                  const newMitrage = e.target.value;
                  setMitrages({ ...mitrages, [baliteId]: newMitrage });
                  const balite = balites.find(
                    (balite) => balite.id === baliteId
                  );
                  const newTotalPrice =
                    totalPricec +
                    (balite.prix_vendre * newMitrage -
                      balite.prix_vendre * (mitrages[baliteId] || 0));
                  setTotalPrice(newTotalPrice);
                }}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Test2;

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-[115px] m-2"
      style={{
        lineHeight: 1,
      }}
    >
      <div className="">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-110%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "110%",
                filter: "drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))",
              },
              hovered: {
                y: 0,
                filter: "drop-shadow(0px 5px 7px rgba(255, 255, 255, 0.5))",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block  text-[#effef7]"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
