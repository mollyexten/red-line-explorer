import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationsURL, stationsURL, config } from "../services";
import axios from "axios";
import Recommendation from "./Recommendation";

function Station() {
  // Store stationId, stationName, and recommendations as state variables
  const [stationId, setStationId] = useState("");
  const [stationName, setStationName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  // Save the parameter from the url in useParams
  const { stationParam } = useParams();

  useEffect(() => {
    // get the id of the station in the parameters from the station table
    const getId = async () => {
      // Make axios get request
      const resp = await axios.get(stationsURL, config);
      const stations = resp.data.records;
      // Use find method to match stationParam with the correct station in stations table
      const stationObject = stations.find((station) => {
        return station.fields.stationKebab === stationParam;
      });
      // Store the id of the matched station as stationId
      setStationId(stationObject.id);
      // Store the name of the matched station as stationName
      setStationName(stationObject.fields.Name);
    };
    getId();
    // Invoke this function whenever the station param changes
  }, [stationParam]);

  useEffect(() => {
    // get all recommendations from the recommendations table
    const getRecommendations = async () => {
      const resp = await axios.get(recommendationsURL, config);
      const recs = resp.data.records;
      // Use filter method to find recommendations for the matching station, store in an variable called stationRecommendations
      const stationRecommendations = recs.filter(
        (rec) => rec.fields.station[0] === stationId
      );
      // Store the stationRecommendations from filter method as the recommendations for this page
      setRecommendations(stationRecommendations);
    };
    getRecommendations();
  // Invoke this function whenever the station id changes
  }, [stationId]);

  // Display a "no recommendations found" page if the station has no recommendations
  if (recommendations.length === 0) {
    return (
      <div>
        <header>
          <h1 className="header-top">{stationName.toUpperCase()}</h1>
          <h1 className="header-bottom">RECOMMENDATIONS</h1>
        </header>
        <main>
          <p>No recommendations found</p>
          <Link to={`/add/${stationParam}`}><button className="share-ideas">Share Ideas</button></Link>
        </main>
      </div>
    );
  }

  // Otherwise, display the station page with its corresponding recommendations
  return (
    <div>
      <header>
        <h1 className="header-top">{stationName.toUpperCase()}</h1>
        <h1 className="header-bottom">RECOMMENDATIONS</h1>
      </header>
      {recommendations.map((recommendation) => (
        <Recommendation
          key={recommendation.id}
          // Pass name and content as props into the recommendation component
          name={recommendation.fields.name}
          content={recommendation.fields.content}
        />
      ))}
      <Link to={`/add/${stationParam}`}><button className="share-ideas">Share Ideas</button></Link>
    </div>
  );
}

export default Station;
