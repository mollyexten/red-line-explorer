import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { recommendationsURL, stationsURL, config } from "../services"
import axios from "axios"
import Recommendation from "./Recommendation"

function Station() {
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  const [results, setResults] = useState([]);
  const params = useParams()
  
  useEffect(() => {
    
    // get the id of the station in the parameters from the station table
    const getId = async () => {
      const resp = await axios.get(stationsURL, config)
      const stations = resp.data.records
      const stationParam = ({ params }.params.station)
      
      // I tried many times over to use .find method here but it never worked
      stations.map((station) => {
        if (station.fields.stationKebab === stationParam) {
          setStationId(station.id)
          setStationName(station.fields.Name)
        }
      })
    }
    getId();
    
    // get the recommendations from the recommendations table
    const getRecommendations = async () => {
      const resp = await axios.get(recommendationsURL, config)
      const recs = resp.data.records
      setResults(recs.filter(rec => (rec.fields.station[0] === stationId)))
      //   if (rec.fields.station[0] === stationId) {
      //     setResults(rec)
      //   }
      // })
      console.log(results)
    }
    getRecommendations();
  }, [])
  
  // const recs = []
  // results.map((result) => {
  //   if (result.fields.station[0] === stationId) {
  //     recs.push(result)
  //   }
  // })

  // console.log(results)
  return (
    <div>
      <h1>{stationName}</h1>
      <Recommendation />
      <Link to="/contribute"><button>Add a Recommendation</button></Link>
    </div>
  )
}

export default Station;