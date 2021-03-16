import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { recommendationsURL, stationsURL, config } from "../services"
import axios from "axios"
import Recommendation from "./Recommendation"

function Station(props) {
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  const [recommendations, setRecommendations] = useState([]);
  const { stationParam } = useParams()
  
  useEffect(() => {
    
    // get the id of the station in the parameters from the station table
    const getId = async () => {
      const resp = await axios.get(stationsURL, config)
      const stations = resp.data.records
      
      const stationObject = stations.find(station => {
        return station.fields.stationKebab === stationParam
      })
      setStationId(stationObject.id)
      setStationName(stationObject.fields.Name)
    }
    getId();
  }, [stationParam])

  useEffect(() => {
    // get the recommendations from the recommendations table
    const getRecommendations = async () => {
      const resp = await axios.get(recommendationsURL, config)
      const recs = resp.data.records
      const stationRecommendations = recs.filter(rec => rec.fields.station[0] === stationId)
      setRecommendations(stationRecommendations)
    }
    getRecommendations();
  }, [stationId])


  // recommendations.map(recommendation => console.log(recommendation.fields.name))
  return (
    <div>
      <header>
        <h1 className="header-top">{stationName.toUpperCase()}</h1>
      </header>
        {recommendations.map((recommendation) => (
          <Recommendation key={recommendation.id} name={recommendation.fields.name} content={recommendation.fields.content} />
        ))}
      <Link to="/contribute">Share Your Ideas</Link>
    </div>
  )
}

export default Station;