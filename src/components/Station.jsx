import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { recommendationsURL, stationsURL, config } from "../services"
import axios from "axios"
import Recommendation from "./Recommendation"

function Station() {
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  const [recommendations, setRecommendations] = useState([]);
  const { stationParam } = useParams()
  
  useEffect(() => {
    
    // get the id of the station in the parameters from the station table
    // const getId = async () => {
    //   const resp = await axios.get(stationsURL, config)
    //   const stations = resp.data.records
      
    //   const stationObject = stations.find(station => {
    //     return station.fields.stationKebab === stationParam
    //   })
    //   setStationId(stationObject.id)
    //   setStationName(stationObject.fields.Name)
    // }
    // getId();
    
    // // get the recommendations from the recommendations table
    // const getRecommendations = async () => {
    //   const resp = await axios.get(recommendationsURL, config)
    //   const recs = resp.data.records
    //   const stationRecommendations = recs.filter(rec => rec.fields.station[0] === stationId)
    //   setRecommendations(stationRecommendations)
    // }
    // getRecommendations();
  })
  return (
    <div>
      <h1>{stationName}</h1>
      {/* {recommendations.map((rec) => (
        <Recommendation recommendation={rec} />
      ))}
      <Link to="/contribute"><button>Add a Recommendation</button></Link> */}
    </div>
  )
}

export default Station;