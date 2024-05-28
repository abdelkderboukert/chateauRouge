import React , {useState, useContext, lazy}from 'react';
// import AuthContext from "../context/AuthContext";
const AuthContext = lazy(() => import("../context/AuthContext"));


const Company = () => {
    const [company, setCompany] = useState({
      name: "",
      place: "",
      re_com: "",
    });
    const { companyadd } = useContext(AuthContext);
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(company);
      try {
        company.re_com.length > 0 &&
          companyadd(
            company.name,
            company.place,
            company.re_com,
          );
        console.log(company.name);
        console.log(company.re_com);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        alert("An error occurred");
      }
    };
    return (
      <div>
        <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              name="place"
              placeholder="place"
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              name="re_com"
              placeholder="re_com"
              onChange={(e) => {
                setCompany({ ...company, [e.target.name]: e.target.value });
              }}
            />
          <button type="submit" id="brnn">
            <h3 style={{ fontWeight: "bold" }}>submit</h3>
          </button>
        </form>
      </div>
    );
}

export default Company;
