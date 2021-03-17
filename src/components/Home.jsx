import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { stationsURL, config } from "../services";

function Home() {
  // Store list of stations in state variable stations
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Make an API call to Airtable database with axios
    const getStations = async () => {
      const resp = await axios.get(stationsURL, config);
      // Store array of data from get reqeust in variable stationObjects
      const stationObjects = resp.data.records;
      // Create an empty array for station information
      const unsortedStations = [];
      stationObjects.map((stationObject) =>
        // Pull out the fields key from stationObjects and push it into the unsortedStations array
        unsortedStations.push(stationObject.fields)
      );
      // Create a compare function for sorting stations by sortId
      function compare(a, b) {
        const stationA = a.sortId;
        const stationB = b.sortId;
        let comparison = 0;
        if (stationA > stationB) {
          comparison = 1;
        } else if (stationA < stationB) {
          comparison = -1;
        }
        return comparison;
      }
      // Sort the stations by sortId, which will order them from Alewife to Ashmont, the the Braintree branch
      const sortedStations = unsortedStations.sort(compare);
      // Store sortedStations as the stations for this component
      setStations(sortedStations);
    };
    // Invoke async function
    getStations();
    // Make get request for stations every time this page loads
  }, []);

  return (
    <div>
      <header>
        <h1 className="header-top">RED LINE</h1>
        <h1 className="header-bottom">EXPLORER</h1>
      </header>
      {/* Map through stations and display their names in an unordered list */}
      <ul>
        {stations.map((station) => (
          <Link to={`/${station.stationKebab}`} key={station.sortId}>
            <li>{station.Name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
