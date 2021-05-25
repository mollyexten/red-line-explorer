import "./ShareIdeas.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ShareIdeas(props) {
  const {
    postRec,
    stationList,
    updateRec,
    allRecs,
    getOneRec,
    convertKebab
  } = props
  const { stationParam, id } = useParams();
  const [stationId, setStationId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [activities, setActivities] = useState([])
  const [food, setFood] = useState(false)
  const [outdoors, setOutdoors] = useState(false)
  const [shopping, setShopping] = useState(false)
  const [entertainment, setEntertainment] = useState(false)
  const [miscellaneous, setMiscellaneous] = useState(false)

  // Put station's name in dropdown if coming from that station's page
  useEffect(() => {
    if (stationParam && stationList.length > 0) {
      const stationEdit = stationList.find((station) => {
        const reformattedStation = convertKebab(station.fields.Name)
        return reformattedStation === stationParam
      })
      setStationId(stationEdit.id)
    } else {
      setStationId(stationList[0].id)
    }
  }, [stationParam, stationList, convertKebab])

  // Fill out form if coming from the "edit" button
  useEffect(() => {
    if (id) {
      const foundRec = getOneRec(allRecs, id)
      setName(foundRec.fields.name)
      setContent(foundRec.fields.content)
      setStationId(foundRec.fields.station[0])
      setActivities(foundRec.fields.activity)
    }
    if (activities.length > 0) {
      if (activities.includes("food")) setFood(true)
      if (activities.includes("outdoors")) setOutdoors(true)
      if (activities.includes("shopping")) setShopping(true)
      if (activities.includes("entertainment")) setEntertainment(true)
      if (activities.includes("miscellaneous")) setMiscellaneous(true)
    }
  }, [id, allRecs, getOneRec, activities])

  // Map out all stations and pass their names into the options tag
  const stationsJSX = stationList.map((station) => (
    <option
      value={station.id}
      key={station.id}
    >
      {station.fields.Name}
    </option>
  ))

  const handleActivities = (e) => {
    const { name, checked } = e.target;
    let updatedActivities = activities
    if (name === "food") setFood(!food)
    if (name === "outdoors") setOutdoors(!outdoors)
    if (name === "shopping") setShopping(!shopping)
    if (name === "entertainment") setEntertainment(!entertainment)
    if (name === "miscellaneous") setMiscellaneous(!miscellaneous)
    if (checked) {
      updatedActivities.push(name)
    } else {
      const index = updatedActivities.indexOf(name)
      updatedActivities.splice(index, 1)
    }
    setActivities(updatedActivities)
  }

  // POST/PUT DATA TO AIRTABLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      name: name,
      content: content,
      station: [stationId],
      activity: activities
    }
    console.log(newRecommendation)
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
            name="name"
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
            name="station"
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
            name="content"
            className="recommendation-input"
            value={content}
            autoComplete="off"
            rows="6"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="activity-row">
          <p>Choose categories:</p>
          <input
            type="checkbox"
            id="food"
            name="food"
            value="food"
            checked={food}
            onChange={handleActivities}
          />
          <label htmlFor="food">food</label>
          <input
            type="checkbox"
            id="outdoors"
            name="outdoors"
            value="outdoors"
            checked={outdoors}
            onChange={handleActivities}
          />
          <label htmlFor="outdoors">outdoors</label>
          <input
            type="checkbox"
            id="shopping"
            name="shopping"
            value="shopping"
            checked={shopping}
            onChange={handleActivities}
          />
          <label htmlFor="shopping">shopping</label>
          <input
            type="checkbox"
            id="entertainment"
            name="entertainment"
            value="entertainment"
            checked={entertainment}
            onChange={handleActivities}
          />
          <label htmlFor="entertainment">entertainment</label>
          <input
            type="checkbox"
            id="miscellaneous"
            name="miscellaneous"
            value="miscellaneous"
            checked={miscellaneous}
            onChange={handleActivities}
          />
          <label htmlFor="miscellaneous">miscellaneous</label>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ShareIdeas;