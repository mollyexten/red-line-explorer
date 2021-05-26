import "./StationMap.css"
import { Link } from "react-router-dom"

export default function StationMap(props) {
  const { stationList, convertKebab } = props
  const stationsJSX = stationList.map((station) => (
    <Link
      to={`/${convertKebab(station.fields.Name)}`}
      key={station.fields.sortId}
      className={convertKebab(station.fields.Name)}
    >
      <li className="station">
        {station.fields.Name}
      </li>
    </Link>
  ))
  
  return (
    <ul className="station-map">
    {stationList && stationsJSX}
  </ul>
  )
}