import "./App.css";
// Import App components
import About from "./components/About/About";
import ShareIdeas from "./components/ShareIdeas/ShareIdeas";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Station from "./components/Station/Station";
import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react"
import { stationsURL, config } from "./services";
import { compare } from "./services/helpers.js"
import axios from "axios";

function App() {
  // This will store the sorted list of stations to pass as props to different components
  const [stationList, setStationList] = useState([]);
  
    useEffect(() => {
      // get the list of stations
      const getStations = async () => {
        // Make axios get request
        const resp = await axios.get(stationsURL, config);
        const stations = resp.data.records;
        // Use the compare function to sort the stations by sortId
        const sortedStations = stations.sort(compare);
        setStationList(sortedStations);
      };
      getStations();
    }, []);
  
  return (
    <div className="App">
      {/* Navbar appears on all paths */}
      <Navbar />
      {/* Other components render in separate views, hence the route paths */}
      <Switch>
        <Route exact path="/">
          <Home stationList={stationList} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {/* Putting <ShareIdeas /> above <Station /> to prevent router from replacing <Component /> route with the <Station /> route */}
        <Route path="/share-ideas">
          <ShareIdeas stationList={stationList} />
        </Route>
        <Route path="/add/:stationParam">
          <ShareIdeas stationList={stationList} />
        </Route>
        <Route path="/:stationParam">
          <Station stationList={stationList}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
