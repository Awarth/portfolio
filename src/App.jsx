import { useEffect, useState } from "react";
import Preloader from "./components/Preloader/Preloader";
import "../src/App.css";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaArrowCircleRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineFileDownload, MdOutlineMailOutline } from "react-icons/md";
import myImg from "./assets/images/file.svg";
import HTML from "./assets/images/html.svg";
import CSS from "./assets/images/css.svg";
import JS from "./assets/images/js.svg";
import REACT from "./assets/images/react.svg";
import GITHUB from "./assets/images/github.svg";
import MongoDb from "./assets/images/mongoDB.png";
import Node from "./assets/images/node.png";
import Express from "./assets/images/express.png";
import Tailwind from "./assets/images/tailwind.png";
import Bootstrap from "./assets/images/bootstrap.png";
import resume from "./assets/resume/resume.pdf";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicId = import.meta.env.VITE_EMAILJS_PUBLIC_ID;

    const { firstName, lastName, email, phoneNo, message } = formData;

    if (!firstName || !lastName || !email || !phoneNo || !message) {
      toast.warning("Fill all the fields of contact form");
      return;
    }

    const fromName = `${firstName} ${lastName}`;

    const formatMsg = `
      Email : ${email}
      Phone No .: ${phoneNo}
      Message : ${message}
    `;

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicId,
      template_params: {
        from_name: fromName,
        to_name: "Adarsh",
        message: formatMsg,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res.data);
      toast.success("Email was sent successfully");
    } catch (error) {
      toast.error("There was an error, Please try again.");
      console.log(error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    });
  };

  const scrollToSection = (sectionId) => {
    setActive(sectionId);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSidebarOptionClick = (sectionId) => {
    setIsOpen(false);
    setMenuOpen(false);
    setActive(sectionId);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
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
                  <li
                    onClick={() => scrollToSection("home")}
                    className={`navLinks ${active === "home" ? "active" : ""}`}
                  >
                    Home
                  </li>
                  <li
                    onClick={() => scrollToSection("projects")}
                    className={`navLinks ${
                      active === "projects" ? "active" : ""
                    }`}
                  >
                    Projects
                  </li>
                  <li
                    onClick={() => scrollToSection("skills")}
                    className={`navLinks ${
                      active === "skills" ? "active" : ""
                    }`}
                  >
                    Skills
                  </li>
                </ul>
              </div>
              <div className="socials">
                <p
                  onClick={() => scrollToSection("communication")}
                  className={`connect connectAnimation ${
                    active === "communication" ? "btnActive" : ""
                  }`}
                >
                  Lets connect
                </p>
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
                <li
                  onClick={() => handleSidebarOptionClick("home")}
                  className={`navLinks ${active === "home" ? "active" : ""}`}
                >
                  Home
                </li>
                <li
                  onClick={() => handleSidebarOptionClick("projects")}
                  className={`navLinks ${
                    active === "projects" ? "active" : ""
                  }`}
                >
                  Projects
                </li>
                <li
                  onClick={() => handleSidebarOptionClick("skills")}
                  className={`navLinks ${active === "skills" ? "active" : ""}`}
                >
                  Skills
                </li>
              </ul>
              <div className="socials">
                <p
                  onClick={() => handleSidebarOptionClick("communication")}
                  className={`connect sidebarConnectAnimation ${
                    active === "communication" ? "btnActive" : ""
                  }`}
                >
                  Lets connect
                </p>
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
                <a download={true} href={resume} className="cv">
                  Download CV <MdOutlineFileDownload className="downloadIcon" />
                </a>
                <div className="socialLinks">
                  <div className="outline">
                    <a href="https://github.com/Awarth" target="_blank">
                      <FaGithub />
                    </a>
                  </div>
                  <div className="outline">
                    <a
                      href="http://www.linkedin.com/in/at-wrath9616"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                  <div className="outline">
                    <a
                      href="https://www.instagram.com/___w.r.a.t.h___"
                      target="_blank"
                    >
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
          <section id="projects">
            <div className="title">
              <h1>My Projects</h1>
            </div>
            <div className="projectDescription">
              We put your ideas and thus your wishes in the form of a unique web
              project that inspires you and you customers.
            </div>
            <div className="projectCardCollection">
              <div className="projectWidget">
                <div className="projectCard">
                  <iframe src="https://youtube-frontend-eosin.vercel.app/"></iframe>
                </div>
                <a
                  href="https://youtube-frontend-eosin.vercel.app/"
                  className="onHover"
                >
                  <div className="gap">
                    <h1>Video Streaming App</h1>
                    <p>
                      A full stack Youtube like app supporting video uploading
                      ,streaming
                    </p>
                  </div>
                  <FaArrowCircleRight />
                </a>
              </div>
              <div className="projectWidget">
                <div className="projectCard">
                  <iframe src="https://blog-website-gilt-beta.vercel.app/"></iframe>
                </div>
                <a
                  href="https://blog-website-gilt-beta.vercel.app/"
                  className="onHover"
                >
                  <div className="gap">
                    <h1>Blog website</h1>
                    <p>A full stack web app created using MERN stack</p>
                  </div>
                  <FaArrowCircleRight />
                </a>
              </div>
              <div className="projectWidget">
                <div className="projectCard">
                  <iframe src="https://the-indian-times.vercel.app/"></iframe>
                </div>
                <a
                  href="https://the-indian-times.vercel.app/"
                  className="onHover"
                >
                  <div className="gap">
                    <h1>News Article</h1>
                    <p>A news article website delivering latest news</p>
                  </div>
                  <FaArrowCircleRight />
                </a>
              </div>
              <div className="projectWidget">
                <div className="projectCard">
                  <iframe src="https://pizza-website-sooty.vercel.app/"></iframe>
                </div>
                <a
                  href="https://pizza-website-sooty.vercel.app/"
                  className="onHover"
                >
                  <div className="gap">
                    <h1>Pizza</h1>
                    <p>Project was about precision and information</p>
                  </div>
                  <FaArrowCircleRight />
                </a>
              </div>
            </div>
          </section>
          <section id="skills">
            <div className="skillsContainer">
              <div className="skillsTitle">
                <h1>My Skills</h1>
              </div>
              <span className="skillsDescription">
                I put your ideas and thus your wishes into the form of a unique
                web project that inspires you and your customers.
              </span>
              <div className="skillsCardCollection">
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={HTML} alt="html" />
                    <p>95%</p>
                  </div>
                  <p>HTML</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={CSS} alt="css" />
                    <p>90%</p>
                  </div>
                  <p>CSS</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={JS} alt="js" />
                    <p>85%</p>
                  </div>
                  <p>JS</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={REACT} alt="react" />
                    <p>75%</p>
                  </div>
                  <p>REACT</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={GITHUB} alt="github" />
                    <p>80%</p>
                  </div>
                  <p>GITHUB</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={Node} alt="node" />
                    <p>70%</p>
                  </div>
                  <p>Node</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={Express} alt="express" />
                    <p>65%</p>
                  </div>
                  <p>EXPRESS</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={MongoDb} alt="mongoDB" />
                    <p>60%</p>
                  </div>
                  <p>MONGODB</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={Tailwind} alt="tailwind" />
                    <p>90%</p>
                  </div>
                  <p>TAILWIND</p>
                </div>
                <div className="skillWidget">
                  <div className="skillsCard">
                    <img src={Bootstrap} alt="bootstrap" />
                    <p>75%</p>
                  </div>
                  <p>Bootstrap</p>
                </div>
              </div>
            </div>
          </section>
          <section id="communication">
            <div className="content">
              <form>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover
                  theme="dark"
                />
                <div className="contactTitle">
                  <h2>Drop your contact</h2>
                </div>
                <span className="fullName">
                  <div className="nameField">
                    <input
                      type="text"
                      id="firstName"
                      className="inputBox"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                    />
                  </div>
                  <div className="nameField">
                    <input
                      type="text"
                      id="lastName"
                      className="inputBox"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Second name"
                    />
                  </div>
                </span>
                <div className="emailField">
                  <input
                    type="email"
                    id="emailInputField"
                    className="inputBox"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>
                <div className="phField">
                  <input
                    type="tel"
                    id="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    placeholder="Phone No. with country code"
                    name="phoneNo"
                  />
                </div>
                <textarea
                  id="message"
                  placeholder="Message"
                  className="inputField"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <button type="submit" id="submitBtn" onClick={handleSubmit}>
                  Send Message
                </button>
              </form>
              <div className="myContactDetails">
                <h1>Adarsh Tiwari</h1>
                <span className="myPhoneNo">
                  <div className="encircle">
                    <FaPhoneAlt />
                  </div>
                  <a href="tel:+919555350284">+91 95553-50284</a>
                </span>
                <span className="myEmail">
                  <div className="encircle">
                    <MdOutlineMailOutline />
                  </div>
                  <a href="mailto:at.wrath9616@gmail.com">
                    at.wrath9616@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App;
