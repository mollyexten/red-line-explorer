import StationMap from "../../components/StationMap/StationMap"
import "./Home.css"

function Home(props) {
  const {
    stationList,
    convertKebab,
  } = props

  return (
    <div >
      <header>
        <h1 className="header-top">RED LINE</h1>
        <h1 className="header-bottom">EXPLORER</h1>
      </header>
      <StationMap stationList={stationList} convertKebab={convertKebab} />
    </div>
  );
}

export default Home;
