// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SearchBal = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.length > 2) {
//         const response = await axios.get(
//           `http://localhost:8000/api/searchB/?q=${searchQuery}`
//         );
//         setSearchResults(response.data);
//       }
//     };
//     fetchSearchResults();
//   }, [searchQuery]);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <div>
//       <input
//         type="search"
//         value={searchQuery}
//         onChange={handleSearchInputChange}
//         placeholder="Search..."
//       />
//       <ul>
//         {searchResults.map((result) => (
//           <li key={result.id}>{result.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBal;
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
