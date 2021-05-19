import "./ShareIdeas.css"
import Popup from "../../components/Popup/Popup"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recommendationsURL, config } from "../../services"


function ShareIdeas({ stationList }) {
  const { stationParam, id } = useParams();

  // const { name, stationId, content } = formData
  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [recId, setRecId] = useState("");

  useEffect(() => {
    if (stationList.length) {
      setStationId(stationList[0].id)
    }
  }, [stationList])

  // State and function for managing the popup component:
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  // Put station's name in dropdown if coming from that station's page
  useEffect(() => {
    if (stationParam && stationList.length) {
      const stationEdit = stationList.find((station) =>
        station.fields.stationKebab === stationParam)
      const preselectedStation = stationEdit.id
      setStationId(preselectedStation)
    }
  }, [stationParam, stationList])

  // POST/PUT DATA TO AIRTABLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
    }
    // Make a post or put request to Airtable
    if (!id) {
      const resp = await axios.post(recommendationsURL, { fields: newRecommendation }, config)
      setRecId(resp.data.id)
    } else {
      const editURL = `${recommendationsURL}/${id}`
      await axios.put(editURL, { fields: newRecommendation }, config)
    }
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
          {stationList.map((station) => (
            <option
              value={station.id}
              key={station.id}
            >
              {station.fields.Name}
            </option>
          ))}
        </select>
        <label htmlFor="recommendation" className="recommendation-label">Recommendation</label>
        <textarea
          required
          id="recommendation"
          className="recommendation-input"
          value={content}
          autoComplete="off"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
      {isOpen && (
        <Popup
          stations={stationList}
          stationId={stationId}
          name={name}
          content={content}
          recId={recId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  )
}

export default ShareIdeas;