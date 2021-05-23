import "./App.css";
import Layout from "./components/shared/Layout/Layout"
import About from "./screens/About/About";
import Stations from "./containers/Stations/Stations"
import { Route, Switch } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route
            path="/"
            render={() => <Stations />}
          />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
