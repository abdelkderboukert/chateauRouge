
import React, { useState, useEffect } from "react";
import axios from "axios";

function BaliteSearch() {
  const [query, setQuery] = useState("");
  const [balites, setBalites] = useState([]);

  useEffect(() => {
    const fetchBalites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/balites/?q=${query}`
        );
        setBalites(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalites();
  }, [query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search balites"
      />
      <ul>
        {balites.map((balite) => (
          <li key={balite.id}>{balite.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BaliteSearch;
