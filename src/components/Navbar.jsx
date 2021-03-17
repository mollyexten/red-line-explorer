import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/contribute">CONTRIBUTE</Link>
    </nav>
  )
}

export default Navbar;