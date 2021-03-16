import axios from "axios";
import { useEffect, useState } from "react";
import { stationsURL, config } from "../services"

function Contribute() {
  const [stations, setStations] = useState([]);
  const [date, setDate] = useState();
  const [station, setStation] = useState();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getStations = async () => {
      const resp = await axios.get(stationsURL, config)
      setStations(resp)
      console.log(stations)
    }
    getStations();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input required type="text" id="name" />
        <label htmlFor="station">Station</label>
        <select required id="station">
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>
        <label htmlFor="recommendation">Recommendation</label>
        <input required type="text" id="recommendation" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contribute;