import { useContext, useState } from "react";
import "../static/css/test.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Test2 from "./test2";

const Test = () => {
    const [showTest2, setShowTest2] = useState(false);

    const handleRenderTest2 = () => {
      setShowTest2((prevShowTest2) => !prevShowTest2);
    };
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      user.username.length > 0 && loginUser(user.username, user.password);
      console.log(user.username);
      console.log(user.password);
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
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top">
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
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#login">
                  login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#signup">
                  Contact
                </a>
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
      <header className="masthead" id="page-top">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1 className="mx-auto my-0 text-uppercase" id="tit">
                ALG ON
              </h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">
                The site will offer a user-friendly interface where candidates
                will be able to download their cv.
              </h2>

              <Link to="/register">
                <a className="btn btn-primary">Get Started</a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="about-section text-center" id="about">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white mb-4" style={{ fontWeight: "bold" }}>
                ALG <span className="highlight">ON</span>
              </h2>
              <p className="text-white-50">
                The site will offer a user-friendly interface where candidates
                will be able to download their cvs, thus facilitating their
                visibility for recruiters. On the business side, a human
                resources management interface will be integrated, improving the
                selection of future employees.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="log-section" id="login">
        <div className="#" id="container">
          <div className="div-login_regist" id="text">
            <h5 id="tit" style={{ fontWeight: "bold" }}>
              JOIN FOR FREE
            </h5>
            <h1 style={{ fontWeight: "bold" }}>
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
              <h1 style={{ fontWeight: "bold" }}>Welcome</h1>
              <h1 style={{ fontWeight: "bold" }}>
                Back to our website<span className="highlight">.</span>
              </h1>
              <form onSubmit={handleSubmit} method="post">
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
                <p style={{ marginLeft: "20px" }}>
                  you don&apos;t have an account?
                  <Link to="/register">clicke here</Link>.
                </p>
                <button type="submit" id="brnn">
                  <h3 style={{ fontWeight: "bold" }}>login</h3>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="signup-section" id="signup">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-10 col-lg-8 mx-auto text-center">
              <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>
              <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
              <form
                className="form-signup"
                id="contactForm"
                data-sb-form-api-token="API_TOKEN"
              >
                <div className="row input-group-newsletter">
                  <div className="col">
                    <input
                      className="form-control"
                      id="emailAddress"
                      type="email"
                      placeholder="Enter email address..."
                      aria-label="Enter email address..."
                      data-sb-validations="required,email"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary disabled"
                      id="submitButton"
                      type="submit"
                    >
                      Notify Me!
                    </button>
                  </div>
                </div>
                <div
                  className="invalid-feedback mt-2"
                  data-sb-feedback="emailAddress:required"
                >
                  An email is required.
                </div>
                <div
                  className="invalid-feedback mt-2"
                  data-sb-feedback="emailAddress:email"
                >
                  Email is not valid.
                </div>
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3 mt-2">
                    Error sending message!
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-section bg-black">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Address</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-50">
                    4923 Market Street, Orlando FL
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-envelope text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Email</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-50">
                    <a href="mailto:ALG_ON@gmail.com"> ALG_ON@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fas fa-mobile-alt text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Phone</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-50">+1 (555) 902-8832</div>
                </div>
              </div>
            </div>
          </div>
          <div className="social d-flex justify-content-center">
            <a className="mx-2" href="#!">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="mx-2" href="#!">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="mx-2" href="#!">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </section>
      <footer className="footer bg-black small text-center text-white-50">
        <div className="container px-4 px-lg-5">
          Copyright &copy; algeriaON.dz 2023
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      <button onClick={handleRenderTest2}>Render Test2</button>
      {showTest2 && <Test2 renderTest2={showTest2} />}
    </div>
  );
};

export default Test;
