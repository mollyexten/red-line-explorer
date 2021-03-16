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
      const stationObjects = resp.data.records
      const unsortedStations = []
      stationObjects.map((stationObject) => (
        unsortedStations.push(stationObject.fields)
      ))
      function compare(a, b) {
        const stationA = a.sortId;
        const stationB = b.sortId;
        let comparison = 0;
        if (stationA > stationB) {
          comparison = 1
        } else if (stationA < stationB) {
          comparison = -1
        }
        return comparison;
      }
      const sortedStations = (unsortedStations.sort(compare))
      // const stationList = stationObjects.map((station) => station.fields.Name)
      setStations(sortedStations)
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
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select>
          {stations.map((station) => (
            <option>{station.Name}</option>
          ))}
          
        </select>
        <label htmlFor="recommendation">Recommendation</label>
        <input
          required
          type="text"
          id="recommendation"
          value={content, setContent}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contribute;