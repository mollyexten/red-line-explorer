import './App.css';
import About from "./components/About"
import Contribute from "./components/Contribute"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Station from "./components/Station"
import { Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar />   
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/:station">
        <Station />
      </Route>
      <Route path="/contribute">
        <Contribute />
      </Route>
    </div>
  );
}

export default App;
