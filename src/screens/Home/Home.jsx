import { Link } from "react-router-dom";
import "./Home.css"

function Home(props) {
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
    <div >
      <header>
        <h1 className="header-top">RED LINE</h1>
        <h1 className="header-bottom">EXPLORER</h1>
      </header>
      <ul className="station-map">
        {stationList && stationsJSX}
      </ul>
    </div>
  );
}

export default Home;
