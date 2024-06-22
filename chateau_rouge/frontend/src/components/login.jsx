import { useContext, useState } from "react";
import "../static/css/test.css";
import AuthContext from "../context/AuthContext";

const Test = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      user.username.length > 0 && loginUser(user.username, user.password);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      ></nav>
      <header className="masthead" id="page-top">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1
                className="mx-auto my-0 text-uppercase"
                style={{ fontSize: "10rem" }}
                id="tit"
              >
                ALG ON
              </h1>
              <h2
                className="text-white-50 mx-auto "
                style={{
                  fontSize: "1.5rem",
                }}
              >
                The site will offer a user-friendly interface where candidates
                will be able to download their cv.
              </h2>
              <a className="btn btn-primary" href="#login">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>
      <section className="log-section" id="login">
        <div className="#" id="container">
          <div className="div-login_regist" id="text">
            <h5 id="tit" style={{ fontWeight: "bold", fontSize: "1rem" }}>
              JOIN FOR FREE
            </h5>
            <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>
              We offer the opportunity to
              <span className="highlight">DEVELOP YOURSELF</span>, You are in
              safe hands
            </h1>
            <br />
            <br />
            <p>We are honored to sponsor you</p>
          </div>
          <div className="div-login_regist" id="regis">
            <div className="login_regist" id="log">
              <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>Welcome</h1>
              <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>
                Back to our website<span className="highlight">.</span>
              </h1>
              <form
                onSubmit={handleSubmit}
                method="post"
                style={{ fontSize: "1.3rem" }}
              >
                <input
                  type="text"
                  name="username"
                  id="btn-email"
                  className="input-login"
                  placeholder="user name"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
                <input
                  type="password"
                  name="password"
                  id="btn-password"
                  className="input-login"
                  placeholder="password"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                  }}
                />
                {/* <p style={{ marginLeft: "20px" }}>
                  you don&apos;t have an account?
                  <Link to="/register">clicke here</Link>.
                </p> */}
                <button
                  type="submit"
                  style={{
                    height: "50px",
                    width: "80%",
                    backgroundColor: "#64a19d",
                    margin: "20px",
                    border: "none",
                    color: "white",
                    borderRadius: "20px",
                  }}
                >
                  {/* id="brnn" */}
                  <h3 style={{ fontWeight: "bold" }}>login</h3>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Test;
