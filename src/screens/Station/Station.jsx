import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationsURL, config } from "../../services";
import axios from "axios";
import Recommendation from "../../components/Recommendation/Recommendation";
import "./Station.css";

function Station(props) {
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
    if (stationParam && props.stationList.length > 0) {
      const stations = props.stationList;

      // Find current station info
      const currentStation = stations.find(
        (station) => station.fields.stationKebab === stationParam
      );
      setStationId(currentStation.id);
      setStationName(currentStation.fields.Name);
      const currentIndex = currentStation.fields.sortId;

      // Find previous station info
      let prevStation;
      // Every previous station is currentIndex - 1 except for North Quincy because of the fork
      if (currentIndex !== 27) {
        prevStation = stations.find(
          (station) => station.fields.sortId === currentIndex - 1
        );
      } else {
        prevStation = stations.find(
          (station) => station.fields.sortId === currentIndex - 5
        );
      }

      // Set the current station (and put an empty string if it is the first stop - Alewife)
      currentIndex === 10
        ? setPrevParam("")
        : setPrevParam(prevStation.fields.stationKebab);

      // Find next station info
      const nextStation = stations.find(
        (station) => station.fields.sortId === currentIndex + 1
      );

      // Set the next station
      // Put an empty string if it is the last stop (Ashmont or Braintree))
      if (currentIndex === 26 || currentIndex === 31) {
        setNextParam("");
      }
      // Hardcode "north-quincy" for JFK/UMass because of the fork
      else if (currentIndex === 22) {
        setNextParam("north-quincy");
      } else {
        setNextParam(nextStation.fields.stationKebab);
      }
      // Only JFK/UMass gets the bonus param, and it is set to "savin-hill" because of the fork
      currentIndex === 22 ? setBonusParam("savin-hill") : setBonusParam("");
    }
  }, [stationParam, props.stationList]);

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
        // Store the stationRecommendations from filter method as the recommendations for this page
        setRecommendations(stationRecommendations);
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
