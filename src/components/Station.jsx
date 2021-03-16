import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { recommendationsURL, stationsURL, config } from "../services"
import axios from "axios"
import Recommendation from "./Recommendation"

function Station() {
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  const [recommendations, setRecommendations] = useState([]);
  const params = useParams()
  
  useEffect(() => {
    
    const getId = async () => {
      const resp = await axios.get(stationsURL, config)
      const stations = resp.data.records
      const stationParam = ({ params }.params.station)
      console.log(stationParam)
      
      stations.map((station) => {
        if (station.fields.stationKebab === stationParam) {
          setStationId(station.id)
          setStationName(station.fields.Name)
        }
      })
    }
    
    getId();
    
    const getRecommendations = async () => {
      const resp = await axios.get(recommendationsURL, config)
      const results = resp.data.records
      console.log(results)
      setRecommendations(results)
    }
    getRecommendations();
  }, [params])
  return (
    <div>
      <h1>{stationName}</h1>
      {recommendations.map((recommendation) => (
        <p>{recommendation}</p>
      ))}
      <Recommendation />
      <Link to="/contribute"><button>Add a Recommendation</button></Link>
    </div>
  )
}

export default Station;