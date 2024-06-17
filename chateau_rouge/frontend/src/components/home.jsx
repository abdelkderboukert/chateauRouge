import "../static/css/test.css";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" id="logo" onClick={logoutUser}>
                  logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <header className="masthead" id="page-top">
          <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="mx-auto my-0 text-uppercase" id="tit">
                  ALG ON
                </h1>
                <h2 className="text-white-50 mx-auto">
                  The site will offer a user-friendly interface where candidates
                  will be able to download their cv.
                </h2>
                <button className="fonction">
                  <Link to="/createclient" className="nav-link">
                    <h2 className="text-white-50 mx-auto">creat client</h2>
                  </Link>
                </button>
                <button className="fonction">
                  <Link to="/datteadd" className="nav-link">
                    <h2 className="text-white-50 mx-auto">add datte</h2>
                  </Link>
                </button>
                <button className="fonction">
                  <Link to="/versadd" className="nav-link">
                    <h2 className="text-white-50 mx-auto">add vers</h2>
                  </Link>
                </button>
                <button className="fonction">
                  <Link to="/companycreate" className="nav-link">
                    <h2 className="text-white-50 mx-auto">creat company</h2>
                  </Link>
                </button>
                <button className="fonction">
                  <Link to="/client" className="nav-link">
                    <h2 className="text-white-50 mx-auto">liste of client</h2>
                  </Link>
                </button>
                <button className="fonction">
                  <Link to="/buying" className="nav-link">
                    <h2 className="text-white-50 mx-auto">creat bon</h2>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </header>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    </>
  );
}

export default Home;
