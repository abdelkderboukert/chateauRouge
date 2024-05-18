import "../static/css/home.css";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useAxios from "../utils/useAxios";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const axiosInstance = useAxios();
  const { logoutUser } = useContext(AuthContext);
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/api/userList/"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error.message} {console.log(error.message)}
      </div>
    );
  }
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>ALGERIA ON</title>
      <link
        rel="icon"
        type="image/x-icon"
        href="{% static 'assets/favicon.ico' %}"
      />
      {/* Font Awesome icons (free version)*/}
      {/* Google fonts*/}
      <link
        href="https://fonts.googleapis.com/css?family=Varela+Round"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet"
      />
      {/* Navigation*/}
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
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="{% url 'create_cv' %}">
                  Create cv
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="{% url 'login' %}#projects ">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="{% url 'login' %}#signup">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="{% url 'update_user' %}">
                  update profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="logo" onClick={logoutUser}>
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="masthead">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1 className="mx-auto my-0 text-uppercase">ALG ON</h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">
                The site will offer a user-friendly interface where candidates
                will be able to download their cv.
              </h2>
            </div>
          </div>
        </div>
      </header>
      <section id="contt_sec">
        <br />
        <br />
        <div className="div-login_regist" id="text_cont">
          <h5 id="tit" style={{ fontWeight: "bold" }}>
            CHOOSE YOUR JOB
          </h5>
          <h1 style={{ fontWeight: "bold" }}>
            We offer the opportunity to
            <span className="highlight">DEVELOP YOURSELF</span>, You are in safe
            hands
          </h1>
          <br />
          <br />
          <p>We are honored to sponsor you</p>
        </div>
        <div className="arrow">
          <div className="slider-container">
            <div className="left-arrow">
              <i className="fa fa-angle-left" style={{ fontSize: 24 }} />
            </div>
            <div className="slider-content" id="slider-content">
              {users.map((user) => (
                <div className="slide" key={user.id}>
                  <div className="mediaa">
                    <img src="{{ job.image.url }}" alt="" />
                  </div>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                .mediaa,\n                .card-sections {\n                  position: absolute;\n                  top: 0;\n                  left: 0;\n                  width: 100%;\n                  height: 100%;\n                  border-radius: 25px;\n                  overflow: hidden;\n                }\n\n                .mediaa {\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                }\n\n                .mediaa img {\n                  position: absolute;\n                  height: 30rem;\n                  filter: grayscale(100%);\n                }\n              ",
                    }}
                  />
                  <div className="card-sections">
                    <div className="lower-section">
                      <div className="card-caption">
                        <h2></h2>
                        send seccsfuly
                      </div>
                    </div>
                    <div className="card__data">
                      <span className="card__description"></span>
                      <h2 className="card__title"></h2>
                      <br />
                      <span className="highlight">slary:</span>
                      <br />
                      <span className="highlight">required age:</span>
                      <br />
                      <span className="highlight">hour of job:</span>
                      <br />
                      <span className="highlight">place of job:</span>
                      <br />
                      <span className="highlight">details:</span>
                      <br />
                      <a href="#" className="card__button">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              <div className="slider-content-background" />
            </div>
            <div className="right-arrow">
              <i className="fa fa-angle-right" style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>
        {/* partial */}
      </section>
      {/* Footer*/}
      <footer className="footer bg-black small text-center text-white-50">
        <div className="container px-4 px-lg-5">
          Copyright © Your Website 2023
        </div>
      </footer>
      {/* Bootstrap core JS*/}
      {/* Core theme JS*/}
    </>
  );
}

export default Home;
