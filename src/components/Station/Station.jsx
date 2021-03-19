import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationsURL, stationsURL, config } from "../../services";
import axios from "axios";
import Recommendation from "../Recommendation/Recommendation";

function Station(props) {
  // Store stationId, stationName, and recommendations as state variables
  const [stationId, setStationId] = useState("");
  const [stationName, setStationName] = useState("");
  const [prevName, setPrevName] = useState("");
  const [prevParam, setPrevParam] = useState("");
  const [nextName, setNextName] = useState("");
  const [nextParam, setNextParam] = useState("");
  const [bonusName, setBonusName] = useState("");
  const [bonusParam, setBonusParam] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  // Save the parameter from the url in useParams
  const { stationParam } = useParams();

  useEffect(() => {
    if (stationParam && props.stationList.length > 0) {
      const stations = props.stationList;
      const currentStation = stations.find(
        (station) => station.fields.stationKebab === stationParam
      );
      setStationId(currentStation.id);
      setStationName(currentStation.fields.Name);
      const currentIndex = currentStation.fields.sortId;
      let prevStation;
      if (currentIndex != 27) {
        prevStation = stations.find(
          (station) => station.fields.sortId === currentIndex - 1
        );
      } else {
        prevStation = stations.find(
          (station) => station.fields.sortId === currentIndex - 5
        );
      }
      currentIndex === 10 ? setPrevName("") : setPrevName(prevStation.fields.Name);
      currentIndex === 10 ? setPrevParam("") : setPrevParam(prevStation.fields.stationKebab);
      const nextStation = stations.find((station) => station.fields.sortId === currentIndex + 1)
      let bonusStation;
      if (currentIndex === 22) {
        bonusStation = stations.find((station) => (station.fields.sortId === 27))
      } else {
        bonusStation = 0
      }
      currentIndex === 26 || 31 ? setNextName("") : setNextName(nextStation.fields.Name);
      currentIndex === 26 || 31 ? setNextParam("") : setNextParam(nextStation.fields.stationKebab);
      currentIndex === 22 ? setBonusName(bonusStation.fields.Name) : setBonusName("");
      currentIndex === 22 ? setBonusParam(bonusStation.fields.stationKebab) : setBonusParam("")

      // }
      // const nextStation = stations.find(
      //   (station) => station.fields.sortId === currentIndex + 1
      // );
      // const nextStationName = nextStation.fields.Name;
      // setNextName(nextStationName);
      // const nextStationKebab = nextStation.fields.stationKebab;
      // setNextParam(nextStationKebab);
    }
  }, [stationParam, props.stationList]);

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

  const hasRecommendations = recommendations.length > 0;

  return (
    <div>
      <header>
        <h1 className="header-top">{stationName.toUpperCase()}</h1>
        <h1 className="header-bottom">
          {prevName} || {prevParam}
          || {nextName}
        </h1>
      </header>
      {/* If the station has recommendations, show the first view, otherwise show the second */}
      {hasRecommendations ? (
        <div>
          {recommendations.map((recommendation) => (
            <Recommendation
              key={recommendation.id}
              // Pass name and content as props into the recommendation component
              name={recommendation.fields.name}
              content={recommendation.fields.content}
            />
          ))}
        </div>
      ) : (
        <p>No recommendations found!</p>
      )}
      <Link to={`/add/${stationParam}`}>
        <button className="share-ideas">Share Ideas</button>
      </Link>
    </div>
  );
}

export default Station;
