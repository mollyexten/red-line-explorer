import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  // I referred to this website for creating a bottom navbar on mobile: https://jfelix.info/blog/create-a-mobile-friendly-navigation-with-react
  const [windowDimension, setWindowDimension] = useState(null);
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  return (
    <div>
      {isMobile ? (
        <nav className="mobile-nav">
          <Link to="/">
            {/* <button>Home</button> */}
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/about">
            {/* <button>About</button> */}
            <i className="fas fa-info-circle"></i>
          </Link>
          <Link to="/share-ideas">
            {/* <button>Share Ideas</button> */}
            <i className="far fa-plus-square"></i>
          </Link>
        </nav>
      ) : (
        <nav className="desktop-nav">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/about">
            <button>About</button>
          </Link>
          <Link to="/share-ideas">
            <button>Share Ideas</button>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
