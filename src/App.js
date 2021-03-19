import "./App.css";
// Import App components
import About from "./components/About/About";
import ShareIdeas from "./components/ShareIdeas/ShareIdeas";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Station from "./components/Station/Station";

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
    </div>
  );
}

export default App;
