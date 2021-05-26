import "./App.css";
import Layout from "./components/shared/Layout/Layout"
import Stations from "./containers/Stations/Stations"
import { Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Layout>
        <Route path="/">
          <Stations />
          </Route>
      </Layout>
    </div>
  );
}

export default App;
