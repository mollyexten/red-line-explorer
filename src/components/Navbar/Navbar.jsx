import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  // I referred to this website for creating a bottom navbar on mobile: https://jfelix.info/blog/create-a-mobile-friendly-navigation-with-react

  // Save windowDimension in state variable
  const [windowDimension, setWindowDimension] = useState(null);

  // When page loads, capture the inner width of the window
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  
  useEffect(() => {
    // This function will reset the window dimension when invoked
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }
    // When the component mounts, this adds handleResize as an event listener
    window.addEventListener("resize", handleResize);
    // When the component unmounts, the event listener is removed so that it doesn't interfere with other pages' windows(?)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This variable will be used in the JSX to determine which view to render
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
