import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { stationsURL, recommendationsURL, config } from "../services"

function Contribute(props) {
  const [stations, setStations] = useState([]);
  // const [date, setDate] = useState();
  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getStations = async () => {
      const resp = await axios.get(stationsURL, config)
      const stationObjects = resp.data.records
      const unsortedStations = []
      stationObjects.map((stationObject) => (
        unsortedStations.push(stationObject)
      ))
      function compare(a, b) {
        const stationA = a.fields.sortId;
        const stationB = b.fields.sortId;
        let comparison = 0;
        if (stationA > stationB) {
          comparison = 1
        } else if (stationA < stationB) {
          comparison = -1
        }
        return comparison;
      }
      const sortedStations = (unsortedStations.sort(compare))
      setStations(sortedStations)
    }
    getStations();
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
    }
    await axios.post(recommendationsURL, { fields: newRecommendation }, config)
    history.push("/")
  }

  return (
    <div>
      <header>
        <h1 className="header-top">SHARE YOUR</h1>
        <h1 className="header-bottom">IDEAS</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select onChange={(e) => setStationId(e.target.value)}>
          <option value="default" disabled>Choose Station</option> 
          {stations.map((station) => (
            <option
              value={station.id}
              key={station.id}
            >
              {station.fields.Name}
            </option>
          ))}
        </select>
        <label htmlFor="recommendation">Recommendation</label>
        <input
          required
          type="text"
          id="recommendation"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contribute;