import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { stationsURL, recommendationsURL, config } from "../services"

function Contribute(props) {
  // store stations, stationId, name, and content as state variables
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  // set up useHistory to redirect user to main page after form submission
  const history = useHistory();

  useEffect(() => {
    // Make an axios get request to get the list of stations for the dropdown menu
    const getStations = async () => {
      const resp = await axios.get(stationsURL, config)
      const stationObjects = resp.data.records
      // Push stationObjects into new array called unsortedStations
      // QUESTION: Maybe I don't need this separate array? Maybe I could just use the sort method on stationObjects?
      const unsortedStations = []
      stationObjects.map((stationObject) => (
        unsortedStations.push(stationObject)
      ))
      // Create a compare function to sort the stations by id
      // QUESTION: Since I'm using this compare function in two components, could I find a way to store it elsewhere and use it here in a more succinct way?
      function compare(a, b) {
        const stationA = a.fields.sortId;
        const stationB = b.fields.sortId;
        let comparison = 0;
        if (stationA > stationB) {
          comparison = 1
        } else if (stationA < stationB) {
          comparison = -1
        }
        return comparison;
      }
      // Sort stations into new variable called sortedStations
      const sortedStations = (unsortedStations.sort(compare))
      // Set the sorted stations as the state variable stations
      setStations(sortedStations)
    }
    getStations();
  // Invoke this function whenever the Contribute component mounts
  }, [])
  
  const handleSubmit = async (e) => {
    // Stop the form from clearing when submit is pressed
    e.preventDefault();
    // Create a new object with data for the post request
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
    }
    // Make a post request to Airtable
    await axios.post(recommendationsURL, { fields: newRecommendation }, config)
    // Redirect user to main page
    // QUESTION: Could I use this to redirect the user to the specific station page for which they made a recommendation?
    history.push("/")
  }

  return (
    <div>
      <header>
        <h1 className="header-top">SHARE YOUR</h1>
        <h1 className="header-bottom">IDEAS</h1>
      </header>
      {/* When this form is submitted, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        {/* Set the value of the name to the value of this textbox */}
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Set the value of this select element to the value of the option selected and stored as stationId */}
        <select onChange={(e) => setStationId(e.target.value)}>
          <option value="default" disabled>Choose Station</option> 
          {/* Map through the sorted list of stations and display them as option elements in the dropdown menu */}
          {stations.map((station) => (
            <option
              // Set the value as the station.id so that setStationId can get stationId
              value={station.id}
              key={station.id}
            >
              {station.fields.Name}
            </option>
          ))}
        </select>
        <label htmlFor="recommendation">Recommendation</label>
        {/* Set the value of content to the value of this textbox */}
        <input
          required
          type="text"
          id="recommendation"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* Make this a submit type button so that the onSubmit event listener triggers the handleSubmit function */}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contribute;