import "./Popup.css";
import Recommendation from "../Recommendation/Recommendation"
import { recommendationsURL, config } from "../../services"
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";

export default function Popup(props) {
  const history = useHistory();
  const {
    stations,
    stationId,
    setIsOpen,
    allRecs,
    getOneRec,
    rec
  } = props
  const [stationName, setStationName] = useState("")
  const [stationPath, setStationPath] = useState("")
  const [recInfo, setRecInfo] = useState ({})

  useEffect(() => {
    const findStationName = (stations, id) => {
      const destination = stations.find(station => station.id === id)
      setStationPath(destination.fields.stationKebab)
      setStationName(destination.fields.Name)
    }
    if (stations) {
      findStationName(stations, stationId)
    }
  }, [stations, stationId])

  useEffect(() => {
    if (rec) {
      const foundRec = getOneRec(allRecs, rec.id)
      setRecInfo(foundRec)
    }
  }, [allRecs, getOneRec, rec])

  const editRec = () => {
    setIsOpen(false)
    history.push(`/edit/${recInfo.id}`)
  }

  const handleRedirect = () => {
    history.push(`/${stationPath}`)
  }

  const deleteRec = async (recInfo) => {
    // removeRec(recId)
    const recURL = `${recommendationsURL}/${recInfo.id}`
    await axios.delete(recURL, config)
    history.push("/")
  }

  return (
    <div className="popup-cover">
      <div className="popup-box">
        <p className="popup-station">Review your submission for {stationName}</p>
        <Recommendation name={recInfo.fields.name} content={recInfo.fields.content}/>
        <div className="popup-buttons">
          <button className="popup-edit" onClick={editRec}>
            edit
          </button>
          <button className="popup-submit" onClick={handleRedirect}>
            submit
          </button>
          <button className="popup-delete" onClick={deleteRec}>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}