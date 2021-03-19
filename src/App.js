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
import axios from "axios";

function App() {
    // Store stationId, stationName, and recommendations as state variables
    const [stationId, setStationId] = useState("");
    const [stationName, setStationName] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    // Save the parameter from the url in useParams
  
    useEffect(() => {
      // get the id of the station in the parameters from the station table
      // const getId = async () => {
      //   // Make axios get request
      //   const resp = await axios.get(stationsURL, config);
      //   const stationsData = resp.data.records;
      //   // Use find method to match stationParam with the correct station in stations table
      //   const stationObject = stationsData.find((stationDatum) => {
      //     return stationDatum.fields.stationKebab === stationParam;
      //   });
      //   // Store the id of the matched station as stationId
      //   setStationId(stationObject.id);
      //   // Store the name of the matched station as stationName
      //   setStationName(stationObject.fields.Name);
      // };
      // getId();
      // Invoke this function whenever the station param changes
    }, []);
  
  return (
    <div className="App">
      {/* Navbar appears on all paths */}
      <Navbar />
      {/* Other components render in separate views, hence the route paths */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {/* Putting <ShareIdeas /> above <Station /> to prevent router from replacing <Component /> route with the <Station /> route */}
        <Route path="/share-ideas">
          <ShareIdeas />
        </Route>
        <Route path="/add/:stationParam">
          <ShareIdeas />
        </Route>
        <Route path="/:stationParam">
          <Station />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
