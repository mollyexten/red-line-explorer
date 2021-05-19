import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationsURL, config } from "../../services";
import { compareRecommendations } from "../../services/helpers.js"
import axios from "axios";
import Recommendation from "../../components/Recommendation/Recommendation";
import "./Station.css";

function Station({ stationList }) {
  // Store stationId, stationName, ids for nearby stations, and recommendations as state variables
  const [stationId, setStationId] = useState("");
  const [stationName, setStationName] = useState("");
  const [prevParam, setPrevParam] = useState("");
  const [nextParam, setNextParam] = useState("");
  const [bonusParam, setBonusParam] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Save the parameter from the url in useParams
  const { stationParam } = useParams();

  // Get info about the current station and those nearby
  useEffect(() => {
    if (stationParam && stationList.length) {
      const currentStation = stationList.find(
        (station) => station.fields.stationKebab === stationParam
      );
      setStationId(currentStation.id);
      setStationName(currentStation.fields.Name);
      const currentIndex = currentStation.fields.sortId;

      let prevStation;
      currentIndex !== 27 ?
        prevStation = stationList.find(station => station.fields.sortId === currentIndex - 1):
        prevStation = stationList.find(station => station.fields.sortId === currentIndex - 5)

      currentIndex === 10 ?
        setPrevParam(null) :
        setPrevParam(prevStation.fields.stationKebab);

      const nextStation = stationList.find(
        (station) => station.fields.sortId === currentIndex + 1);

      if (currentIndex === 26 || currentIndex === 31) {
        setNextParam(null);
      }
      else if (currentIndex === 22) {
        setNextParam("north-quincy");
      } else {
        setNextParam(nextStation.fields.stationKebab);
      }
      currentIndex === 22 ? setBonusParam("savin-hill") : setBonusParam(null);
    }
  }, [stationParam, stationList]);

  useEffect(() => {
    if (stationId) {
      // get all recommendations from the recommendations table
      const getRecommendations = async () => {
        const resp = await axios.get(recommendationsURL, config);
        const recs = resp.data.records;
        // Use filter method to find recommendations for the matching station, store in an variable called stationRecommendations
        const stationRecommendations = recs.filter(
          (rec) => rec.fields.station[0] === stationId
        );
        const chronoRecs = stationRecommendations.sort(compareRecommendations);
        setRecommendations(chronoRecs);
      };
      getRecommendations();
    }
    // Invoke this function whenever the station id changes
  }, [stationId]);

  return (
    <div>
      <header className="header-station">
        <h1 className="header-top-station">{stationName.toUpperCase()}</h1>
        {/* The next part specifies when linked arrows should be displayed according to prev, next, and bonus station info */}
        <div className="header-bottom-station">
          <div className="left">
            {prevParam && (
              <Link to={`/${prevParam}`}>
                <i className="fas fa-arrow-left" />
              </Link>
            )}
          </div>{" "}
          <div className="bottom">
            {bonusParam && (
              <Link to={`${bonusParam}`}>
                <i className="fas fa-arrow-down" />
              </Link>
            )}
          </div>{" "}
          <div className="right">
            {nextParam && (
              <Link to={`${nextParam}`}>
                <i className="fas fa-arrow-right" />
              </Link>
            )}
          </div>
        </div>
      </header>
      <Link to={`/add/${stationParam}`}>
        <button className="share-ideas">Share Ideas</button>
      </Link>
      {/* Pass station recommendations as props into the recommendation component */}
      <div className="recommendations-div">
        {recommendations &&
          recommendations.map((recommendation) => (
            <Recommendation
              key={recommendation.id}
              // Pass name and content as props into the recommendation component
              name={recommendation.fields.name}
              date={recommendation.createdTime}
              content={recommendation.fields.content}
            />
          ))}
      </div>
    </div>
  );
}

export default Station;
