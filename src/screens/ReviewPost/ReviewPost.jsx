import "./ReviewPost.css";
import Recommendation from "../../components/Recommendation/Recommendation"
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReviewPost(props) {
  const {
    stationList,
    getOneStation,
    allRecs,
    getOneRec,
    convertKebab,
    removeRec
  } = props
  const { recId } = useParams();
  const history = useHistory();
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  
  useEffect(() => {
    if (recId) {
      const recInfo = getOneRec(allRecs, recId)
      setName(recInfo.fields.name)
      setContent(recInfo.fields.content)
      setDate(recInfo.createdTime)
      setStationId(recInfo.fields.station[0])
    }
  }, [recId, allRecs, getOneRec])

  useEffect(() => {
    if (stationId) {
      const foundStation = getOneStation(stationList, stationId)
      const stationName = foundStation.fields.Name
      setStationName(stationName)
    }
  }, [stationId, stationList, getOneStation])

  const editRec = () => {
    history.push(`/edit/${recId}`)
  }

  const submitRec = () => {
    const destination = convertKebab(stationName)
    history.push(`/${destination}`)
  }

  const deleteRec = async (e) => {
    removeRec(e.target.value)
    history.push("/")
  }

  return (
    <>
      <header>
        <h1 className="header-top">REVIEW YOUR</h1>
        <h1 className="header-bottom">POST</h1>
      </header>
      <main className="review-container">
        <p className="review-station">
          {`Review your submission for ${stationName.toUpperCase()}`}
        </p>
        <Recommendation
          name={name}
          date={date}
          content={content}
        />
        <div className="review-buttons">
          <button
            value={recId}
            className="review-delete"
            onClick={(e) => deleteRec(e)}
          >
            delete
          </button>
          <button className="review-edit" onClick={editRec}>
            edit
          </button>
          <button className="review-submit" onClick={submitRec}>
            looks good!
          </button>

        </div>
      </main>
    </>
  )
}