import axios from "axios";
import { Link } from "react-router-dom"
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
    <div>
      <header>  
        <h1 className="header-top">RED LINE</h1>
        <h1 className="header-bottom">EXPLORER</h1>
      </header>
      <ul>
      {stations.map((station) => (
        <Link to={`/${station.stationKebab}`} key={station.sortId}>
          <li>{station.Name}</li>
        </Link>
      ))}
      
    </ul>
    </div>
  )  
}

export default Home;