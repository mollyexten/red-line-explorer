import "./App.css";
import About from "./components/About";
import Contribute from "./components/Contribute";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Station from "./components/Station";
import { Route, Switch } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contribute">
          <Contribute />
        </Route>
        <Route exact path="/:stationParam">
          <Station />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
