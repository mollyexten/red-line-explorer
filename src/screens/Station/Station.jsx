import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Recommendation from "../../components/Recommendation/Recommendation";
import "./Station.css";

function Station(props) {
  const {
    stationList,
    getStationRecs,
    allRecs,
    convertKebab
  } = props;
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
      const currentStation = stationList.find(station => {
        const reformattedStation = convertKebab(station.fields.Name)
        return reformattedStation === stationParam
      });
      setStationId(currentStation.id);
      setStationName(currentStation.fields.Name);
      setPrevParam(currentStation.fields.prev)
      setNextParam(currentStation.fields.next)
      setBonusParam(currentStation.fields.bonus)
    }
  }, [stationParam, stationList, convertKebab]);

  useEffect(() => {
    if (stationId && allRecs.length) {
      const recs = getStationRecs(allRecs, stationId)
      setRecommendations(recs)
    }
  }, [allRecs, stationId, getStationRecs])

  const recommendationsJSX = recommendations.map((recommendation) => (
    <Recommendation
      key={recommendation.id}
      name={recommendation.fields.name}
      date={recommendation.createdTime}
      content={recommendation.fields.content}
    />
  ))

  return (
    <div>
      <header>
        <h1 className="header-top">{stationName.toUpperCase()}</h1>
        <div className={`header-bottom-station header-bottom ${stationName.toLowerCase()}-arrows`}>
            {prevParam && (
              <Link to={`/${prevParam}`}>
                <i className="fas fa-arrow-left" />
              </Link>
            )}
            {bonusParam && (
              <Link to={`${bonusParam}`}>
                <i className="fas fa-arrow-down" />
              </Link>
            )}
            {nextParam && (
              <Link to={`${nextParam}`}>
                <i className="fas fa-arrow-right" />
              </Link>
            )}
        </div>
      </header>
      <Link to={`/add/${stationParam}`}>
        <button className="share-ideas">Share Ideas</button>
      </Link>
      <div className="recommendations-div">
        {recommendations && recommendationsJSX}
      </div>
    </div>
  );
}

export default Station;
