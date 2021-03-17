import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/"><button>Home</button></Link>
      <Link to="/about"><button>About</button></Link>
      <Link to="/contribute"><button>Share Ideas</button></Link>
    </nav>
  )
}

export default Navbar;