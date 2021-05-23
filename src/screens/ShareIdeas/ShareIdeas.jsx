import "./ShareIdeas.css"
// import Popup from "../../components/Popup/Popup"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { recommendationsURL, config } from "../../services"


function ShareIdeas(props) {
  const {
    postRec,
    stationList,
    updateRec,
    allRecs,
    getOneRec
  } = props
  const { stationParam, id } = useParams();
  const history = useHistory();

  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  // const [rec, setRec] = useState({})

  // State and function for managing the popup component:
  // const [isOpen, setIsOpen] = useState(false)
  // const togglePopup = () => {
  //   setIsOpen(!isOpen)
  // }

  // Put station's name in dropdown if coming from that station's page
  useEffect(() => {
    if (stationParam && stationList.length > 0) {
      const stationEdit = stationList.find((station) => station.fields.stationKebab === stationParam)
      setStationId(stationEdit.id)
    } else {
      setStationId(stationList[0].id)
    }
  }, [stationParam, stationList])

  useEffect(() => {
    if (id) {
      const foundRec = getOneRec(allRecs, id)
      console.log(foundRec)
      setName(foundRec.fields.name)
      setContent(foundRec.fields.content)
      setStationId(foundRec.fields.station[0])
    }
  }, [id, allRecs, getOneRec])

  // POST/PUT DATA TO AIRTABLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
    }
    if (id) {
      updateRec(id, newRecommendation)
      // const editURL = `${recommendationsURL}/${id}`
      // await axios.put(editURL, { fields: newRecommendation }, config)
      // history.push(`/preview/${id}`)
    } else {
      postRec(newRecommendation)
    }
    // togglePopup()
  }

  return (
    <div className="share-div">
      <header>
        <h1 className="header-top">SHARE YOUR</h1>
        <h1 className="header-bottom">IDEAS</h1>
      </header>
      {/* When this form is submitted, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <div className="name-row">
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
        </div>
        {/* Set the value of this select element to the value of the option selected and stored as stationId */}
        <div className="station-row">
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
        </div>
        <div className="recommendation-row">
          <label htmlFor="recommendation" className="recommendation-label">Recommendation</label>
          <textarea
            required
            id="recommendation"
            className="recommendation-input"
            value={content}
            autoComplete="off"
            rows="6"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
      {/* {isOpen && (
        <Popup
          stations={stationList}
          stationId={stationId}
          allRecs={allRecs}
          name={name}
          content={content}
          setIsOpen={setIsOpen}
          getOneRec={getOneRec}
          // removeRec={removeRec}
          rec={rec}
          id={id}
        />
      )} */}
    </div>
  )
}

export default ShareIdeas;