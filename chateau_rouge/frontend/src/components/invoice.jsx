import { useContext, useState, useEffect } from "react";
import AuthContex from "../context/AuthContext";
import axios from "axios";
import Select from "react-select";
import { NavBar } from "./navbar";

const Invoice = () => {
  const [client, setwClient] = useState();
  const [clients, setClient] = useState([]);
  const [queryBalites, setQueryBalites] = useState("");
  const [balites, setBalites] = useState([]);
  const [wbalites, setwBalites] = useState([]); // store the selected balite IDs
  const [mitrages, setMitrages] = useState({});
  const [errors, setErrors] = useState({});
  const [totalPricec, setTotalPrice] = useState(0);
  const [selectedBalites, setSelectedBalites] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clients/")
      .then((res) => setClient(res.data))
      .catch((err) => setErrors(err.response.data));
  }, [errors]);
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
      setSelectedBalites([]);
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
              left: "84.95%",
              boxShadow: "-4px -4px black",
            }}
          />
          <div
            className=" absolute bg-transparent top-0 rounded-tr-[15px]"
            style={{
              height: 15,
              width: 15,
              bottom: 0,
              left: "13.85%",
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
          <div className=" absolute top-0 left-[15%] flex justify-center items-center bg-black w-[70%] h-14 rounded-b-[40px]"></div>
          <div className=" absolute bottom-0 left-0 flex justify-center items-center bg-black w-[40%] h-16 rounded-tr-[15px]">
            <button
              className="bg-[#325d4b] text-white rounded-[10px]"
              style={{ height: 44, width: "calc( 100% - 15px )" }}
              type="submit"
            >
              <h3 style={{ fontWeight: "bold" }}>Submit</h3>
            </button>
          </div>
          <div className=" absolute bottom-0 left-[40%] flex justify-start items-center w-[59%] h-16 whitespace-nowrap text-[18px] font-black uppercase sm:text-xl overflow-hidden md:text-xl lg:text-2xl px-4 border-[3px] border-black rounded-[15px] m-1">
            Total prix : <span style={{ color: "red" }}>{totalPricec}</span>DA
            <button
              type="button"
              className="ml-auto"
              onClick={() => {
                setTotalPrice(0);
                setwBalites([]);
                setMitrages({});
                setSelectedBalites([]);
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
          <Select
            value={selectedBalites}
            onChange={(selectedOptions) => {
              setSelectedBalites(selectedOptions);
              const newWbalites = selectedOptions.map((option) => option.value);
              setwBalites(newWbalites);
              let newTotalPrice = totalPricec; // Reset to initial total price
              newTotalPrice = 0; // Reset to 0, so we can recalculate the total price
              selectedOptions.forEach((option) => {
                const balite = balites.find((b) => b.id === option.value);
                newTotalPrice +=
                  balite.prix_vendre * (mitrages[balite.id] || 0);
              });
              setTotalPrice(newTotalPrice);
            }}
            options={balites.map((balite) => ({
              value: balite.id,
              label: balite.name,
            }))}
            isMulti={true}
          />
          <div
            style={{
              maxWidth: "100%",
              height: "290px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {wbalites.map((baliteId) => (
              <div
                key={baliteId}
                style={{
                  maxWidth: "190px",
                  height: "90px",
                  // display: "flex",
                  // flexWrap: "wrap",
                  // justifyContent: "space-between",
                }}
              >
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
        </div>
      </form>
    </div>
  );
};

export default Invoice;
