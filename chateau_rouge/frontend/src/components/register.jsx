import "../static/css/register.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const { registerUser } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      user.email.length > 0 &&
        registerUser(
          user.email,
          user.first_name,
          user.last_name,
          user.password,
          user.password2
        );
      console.log(user.first_name);
      console.log(user.password);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="{% url 'login'%}#page-top">
            ALGERIA ON
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  about
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  registre
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="log-section1" id="login">
        <div className="#" id="container">
          <div className="div-login_regist" id="text">
            <h5 id="tit" style={{ fontWeight: "bold" }}>
              JOIN FOR FREE
            </h5>
            <h1 style={{ fontWeight: "bold" }}>
              We offer the opportunity to{" "}
              <span className="highlight">DEVELOP YOURSELF</span>, You are in
              safe hands
            </h1>
            <br />
            <br />
            <p>We are honored to sponsor you</p>
          </div>
          <div className="div-login_regist" id="regis">
            <div className="login_regist" id="log">
              <h1 style={{ fontWeight: "bold" }}>Create</h1>
              <h1 style={{ fontWeight: "bold" }}>
                New account<span className="highlight">.</span>
              </h1>
              <form method="post" onSubmit={handleSubmit}>
                <div className="put-con">
                  <input
                    type="text"
                    name="first_name"
                    className="put-to"
                    placeholder="name"
                    onChange={(e) => {
                      setUser({ ...user, [e.target.name]: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="last_name"
                    className="put-to"
                    placeholder="prename"
                    onChange={(e) => {
                      setUser({ ...user, [e.target.name]: e.target.value });
                    }}
                  />
                </div>
                <div className="put-con">
                  <input
                    type="email"
                    name="email"
                    className="put-on"
                    placeholder="email"
                    onChange={(e) => {
                      setUser({ ...user, [e.target.name]: e.target.value });
                    }}
                  />
                </div>
                <div className="put-con">
                  <input
                    type="text"
                    name="phone"
                    className="put-to"
                    placeholder="N°phon"
                  />
                  <input
                    type="text"
                    name="address"
                    className="put-to"
                    placeholder="address"
                  />
                </div>
                <div className="put-con">
                  <input
                    type="password"
                    name="password"
                    className="put-to"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({ ...user, [e.target.name]: e.target.value });
                    }}
                  />
                  <input
                    type="password"
                    name="password2"
                    className="put-to"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({ ...user, [e.target.name]: e.target.value });
                    }}
                  />
                </div>
                <p style={{ marginLeft: "20px" }}>
                  you alrady have a accont
                  <Link to="/login" className="nav-link">
                    login
                  </Link>
                  .
                </p>
                <button type="submit" id="brnn">
                  <h3 style={{ fontWeight: "bold" }}>Sing up</h3>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer bg-black small text-center text-white-50">
        <div className="container px-4 px-lg-5">
          Copyright &copy; algeriaON.dz 2023
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
      <script src="{% static 'js/register.js' %}"></script>
    </>
  );
};

export default Register;
