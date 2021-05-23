import "./ShareIdeas.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ShareIdeas(props) {
  const {
    postRec,
    stationList,
    updateRec,
    allRecs,
    getOneRec
  } = props
  const { stationParam, id } = useParams();

  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Put station's name in dropdown if coming from that station's page
  useEffect(() => {
    if (stationParam && stationList.length > 0) {
      const stationEdit = stationList.find((station) => station.fields.stationKebab === stationParam)
      setStationId(stationEdit.id)
    } else {
      setStationId(stationList[0].id)
    }
  }, [stationParam, stationList])

  // Fill out form if coming from the "edit" button
  useEffect(() => {
    if (id) {
      const foundRec = getOneRec(allRecs, id)
      console.log(foundRec)
      setName(foundRec.fields.name)
      setContent(foundRec.fields.content)
      setStationId(foundRec.fields.station[0])
    }
  }, [id, allRecs, getOneRec])

  // Map out all stations and pass their names into the options tag
  const stationsJSX = stationList.map((station) => (
    <option
      value={station.id}
      key={station.id}
    >
      {station.fields.Name}
    </option>
  ))

  // POST/PUT DATA TO AIRTABLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
    }
    id ? updateRec(id, newRecommendation) : postRec(newRecommendation)
  }

  return (
    <div className="share-div">
      <header>
        <h1 className="header-top">SHARE YOUR</h1>
        <h1 className="header-bottom">IDEAS</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="name-row">
          <label htmlFor="name" className="name-label">Name</label>
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
        <div className="station-row">
          <label htmlFor="station" className="station-label">Station</label>
          <select
            className="station-input"
            id="station"
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
          >
            {stationList.length > 0 && stationsJSX}
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
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ShareIdeas;