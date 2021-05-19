import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recommendationsURL, config } from "../../services"
import "./ShareIdeas.css"
import Popup from "../../components/Popup/Popup"

function ShareIdeas(props) {
  // store stationId, name, and content as state variables
  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [recId, setRecId] = useState("");

  // State and function for managing the popup component:
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  
  // set up useParams to automatically fill in station
  const { stationParam } = useParams();

  // PUT STATION NAME IN DROPDOWN IF COMING FROM THAT STATION'S PAGE
  useEffect(() => {
    // Check if this page has stationParams and has already passed the station list as props
    // Saved-by-the-code helped me figure this part out
    if (stationParam && props.stationList.length > 0) {
      const stations = props.stationList
      const stationEdit = stations.find((station) => station.fields.stationKebab === stationParam)
      const preselectedStation = stationEdit.id
      setStationId(preselectedStation)
    }
  }, [stationParam, props.stationList])

  // POST DATA TO AIRTABLE
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
    const resp = await axios.post(recommendationsURL, { fields: newRecommendation }, config)
    console.log(resp.data.id)
    setRecId(resp.data.id)

    togglePopup()
  }

  return (
    <div className="share-div">
      <header>
        <h1 className="header-top">SHARE YOUR</h1>
        <h1 className="header-bottom">IDEAS</h1>
      </header>
      {/* When this form is submitted, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="name-label">Name</label>
        {/* Set the value of the name to the value of this textbox */}
        <input
          required
          type="text"
          id="name"
          className="name-input"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        {/* Set the value of this select element to the value of the option selected and stored as stationId */}
        <label htmlFor="station" className="station-label">Station</label>
        <select
          className="station-input"
          id="station"
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
        >
          {/* Map through the sorted list of stations and display them as option elements in the dropdown menu */}
          {props.stationList.map((station) => (
            <option
              // Set the value as the station.id so that setStationId can get stationId
              value={station.id}
              key={station.id}
            >
              {station.fields.Name}
            </option>
          ))}
        </select>
        <label htmlFor="recommendation" className="recommendation-label">Recommendation</label>
        {/* Set the value of content to the value of this textbox */}
        <textarea
          required
          id="recommendation"
          className="recommendation-input"
          value={content}
          autoComplete="off"
          onChange={(e) => setContent(e.target.value)}
        />
        {/* Make this a submit type button so that the onSubmit event listener triggers the handleSubmit function */}
        <button
          type="submit"
          className="submit-button"
          // onClick={togglePopup}
        >
          Submit
        </button>
      </form>
      {isOpen && (
        <Popup
          stations={props.stationList}
          stationId={stationId}
          name={name}
          content={content}
          recId={recId}
        />
      )}
    </div>
  )
}

export default ShareIdeas;