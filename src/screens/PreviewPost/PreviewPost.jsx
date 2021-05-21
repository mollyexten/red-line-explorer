import "./PreviewPost.css";
import Recommendation from "../../components/Recommendation/Recommendation"
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PreviewPost(props) {
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
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [stationId, setStationId] = useState("")
  const [stationName, setStationName] = useState("")
  
  useEffect(() => {
    if (recId && allRecs && getOneRec) {
      const recInfo = getOneRec(allRecs, recId)
      // const id = recInfo.id
      const recName = recInfo.fields.name
      const recContent = recInfo.fields.content
      const recDate = recInfo.createdTime
      const recStation = recInfo.fields.station[0]
      // setId(id)
      setName(recName)
      setContent(recContent)
      setDate(recDate)
      setStationId(recStation)
    }
  }, [recId, allRecs, getOneRec])

  useEffect(() => {
    if (stationId) {
      const foundStation = getOneStation(stationList, stationId)
      const stationName = foundStation.fields.Name
      setStationName(stationName)
    }
  }, [stationId, stationList, getOneRec])

  const editRec = () => {
    history.push(`/edit/${recId}`)
  }

  const submitRec = () => {
    const destination = convertKebab(stationName)
    history.push(`/${destination}`)
  }

  const deleteRec = async (e) => {
    removeRec(e.target.value)
  }

  return (
    <>
      <header>
        <h1 className="header-top">PREVIEW YOUR</h1>
        <h1 className="header-bottom">POST</h1>
      </header>
      <p className="popup-station">Review your submission for {stationName} Station</p>
      <Recommendation name={name} date={date} content={content}/>
        <div className="popup-buttons">
          <button className="popup-edit" onClick={editRec}>
            edit
          </button>
          <button className="popup-submit" onClick={submitRec}>
            submit
          </button>
        <button value={recId} className="popup-delete" onClick={(e) => deleteRec(e)}>
            delete
          </button>
        </div>
    </>
  )
}