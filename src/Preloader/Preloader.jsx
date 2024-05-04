import { useEffect, useState } from "react";
import "../Preloader/Preloader.css";
import RingLoader from "react-spinners/RingLoader";

function Preloader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Delay the fade out effect for 2.5 seconds
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
    <div className={`sweet-loading ${fadeOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <RingLoader color="#2b36d5" size={100} />
      </div>
    </div>
    <div className="blank"></div>
    </>
  );
}

export default Preloader;
