import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

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
            <i className="fas fa-home" />
          </Link>
          <Link to="/about">
            <i className="fas fa-info-circle" />
          </Link>
          <Link to="/share-ideas">
            <i className="far fa-plus-square" />
          </Link>
        </nav>
      ) : (
        <nav className="desktop-nav">
          <Link to="/">
            <i className="fas fa-home" />
            Home
          </Link>
          <Link to="/about">
            <i className="fas fa-info-circle" />
            About
          </Link>
          <Link to="/share-ideas">
            <i className="far fa-plus-square" />
            Share Ideas
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
