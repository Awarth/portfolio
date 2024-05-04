import { useEffect, useState } from "react";
import Preloader from "./Preloader/Preloader";
import "../src/App.css";
import { NavLink } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import myImg from "./assets/images/file.svg";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const loading = () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    loading();
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader setLoading={setLoading} />
      ) : (
        <>
          <nav>
            <div className="logo">At</div>
            <div className="navContent">
              <div className="navOptions">
                <ul>
                  <li>
                    <NavLink
                      to="/home"
                      className="navLinks"
                      activeclassname="active"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/skills"
                      className="navLinks"
                      activeclassname="active"
                    >
                      Skills
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/projects"
                      className="navLinks"
                      activeclassname="active"
                    >
                      Projects
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="socials">
                <button className="connect connectAnimation">
                  Lets connect
                </button>
              </div>
            </div>
            <div
              className={`menu-btn ${menuOpen ? "open" : ""}`}
              onClick={handleMenuClick}
            >
              <div className="menu-btn__burger"></div>
            </div>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <NavLink
                    to="/home"
                    className="navLinks"
                    activeclassname="active"
                  >
                    {" "}
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/skills"
                    className="navLinks"
                    activeclassname="active"
                  >
                    Skills
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects"
                    className="navLinks"
                    activeclassname="active"
                  >
                    Projects
                  </NavLink>
                </li>
              </ul>
              <div className="socials">
                <button className="connect sidebarConnectAnimation">
                  Lets connect
                </button>
              </div>
            </div>
          </nav>

          <section id="home">
            <div className="intro">
              <span className="name">I am Adarsh</span>
              <h1 className="role">Frontend Developer</h1>
              <span className="para">
                I specialize in crafting engaging and user-friendly web
                application interfaces, prioritizing seamless experiences and
                innovative design solutions to elevate user interactions and
                satisfaction.
              </span>
              <div className="cvDownloadAndSocial">
                <button className="cv">
                  Download CV <MdOutlineFileDownload className="downloadIcon" />
                </button>
                <div className="socialLinks">
                  <div className="outline">
                    <a href="https://github.com" target="_blank">
                      <FaGithub />
                    </a>
                  </div>
                  <div className="outline">
                    <a href="https://linkedin.com" target="_blank">
                      <FaLinkedin />
                    </a>
                  </div>
                  <div className="outline">
                    <a href="https://instagram.com" target="_blank">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="photoSection">
              <div className="myPhoto">
                <img src={myImg} alt="my Photo" />
              </div>
            </div>
          </section>
          <section id="skills">
            <div className="skillsContainer">
              <div className="skillsTitle">
                <h1>My Skills</h1>
              </div>
            </div>
          </section>
          <section id="projects"></section>
        </>
      )}
    </>
  );
}

export default App;
