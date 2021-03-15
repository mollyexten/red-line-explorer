import { Link } from "react-router-dom"
import Recommendation from "./Recommendation"

function Station() {
  return (
    <div>
      <h1>STATION</h1>
      <Recommendation />
      <Link to="/contribute"><button>Add a Recommendation</button></Link>
    </div>
  )
}

export default Station;