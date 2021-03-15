import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contribute">Add a Recommendation</Link>
    </nav>
  )
}

export default Navbar;