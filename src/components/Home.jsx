import axios from "axios";
import { useEffect, useState } from "react";
import { stationsURL, config } from "../services"

function Home() {
  const [stations, setStations] = useState([]);

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
      setStations(sortedStations)
    }
    getStations();
  }, [])

  return (
    <ul>
      {stations.map((station, sortId) => (
        <li key={station.sortId}>{station.Name}</li>
      ))}
      
    </ul>
  )
}

export default Home;