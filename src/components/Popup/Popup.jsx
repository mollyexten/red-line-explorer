import "./Popup.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react"

export default function Popup(props) {
  const history = useHistory();
  const { stations, stationId, name, content } = props
  const [stationPath, setStationPath] = useState("")

  useEffect(() => {
    const findStationName = (stations, id) => {
      const destination = stations.find(station => station.id === id)
      const destinationPath = destination.fields.stationKebab
      setStationPath(destinationPath)
    }
    if (stations) {
      findStationName(stations, stationId)
    }
  }, [stations, stationId])

  const handleRedirect = () => {
    history.push(`/${stationPath}`)
  }

  return (
    <div className="popup-cover">
      <div className="popup-box">
        <p className="popup-station">Review your submission for {stationId}</p>
        <div className="rec-text">
          <h3 className="rec-name">{name}</h3>
          <p className="rec-content">{content}</p>
        </div>
        <div className="popup-buttons">
          <button className="popup-edit">edit</button>
          <button
            className="popup-submit"
            onClick={handleRedirect}
          >
            submit
          </button>
          <button className="popup-delete">delete</button>
        </div>
      </div>
    </div>
  )
}