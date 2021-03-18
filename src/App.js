import "./App.css";
// Import App components
import About from "./components/About";
import ShareIdeas from "./components/ShareIdeas";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Station from "./components/Station";

import { Route, Switch } from "react-router-dom";

function App() {

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
      <footer>
        Background photo credit: <a href=
          "https://commons.wikimedia.org/wiki/File:Outbound_train_at_Charles_MGH_station,_May_2006.jpg"
        >
          Adam E. Moreira
        </a>,
        <a href="http://creativecommons.org/licenses/by-sa/3.0/">
          CC BY-SA 3.0
        </a>
        , via Wikimedia Commons
      </footer>
    </div>
  );
}

export default App;
