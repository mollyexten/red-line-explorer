import { Link } from "react-router-dom";
import "./Home.css"

function Home({ stationList }) {
  return (
    <div >
      <header>
        <h1 className="header-top">RED LINE</h1>
        <h1 className="header-bottom">EXPLORER</h1>
      </header>
      {/* Map through stations and display their names in an unordered list */}
      <ul className="station-map">
        {stationList.map((station) => (
          <Link
            to={`/${station.fields.stationKebab}`}
            key={station.fields.sortId}
            className={station.fields.stationKebab}
          >
            <li
              className="station"
            >
              {station.fields.Name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
