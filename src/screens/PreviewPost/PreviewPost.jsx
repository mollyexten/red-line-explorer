import "./PreviewPost.css";
import Recommendation from "../../components/Recommendation/Recommendation"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PreviewPost(props) {
  const {
    stationList,
    allRecs,
    getOneRec,
    removeRec
  } = props
  const { recId } = useParams();
  // const [recInfo, setRecInfo] = useState({})
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (recId) {
      const recInfo = getOneRec(allRecs, recId)
      const recName = recInfo.fields.name
      const recContent = recInfo.fields.content
      const recDate = recInfo.createdTime
      setName(recName)
      setContent(recContent)
      setDate(recDate)
    }
  }, [recId, allRecs, getOneRec])

  return (
    <>
      <header>
        <h1 className="header-top">PREVIEW YOUR</h1>
        <h1 className="header-bottom">POST</h1>
      </header>
      <p className="popup-station">Review your submission for </p>
      <Recommendation name={name} date={date} content={content}/>
        <div className="popup-buttons">
          <button className="popup-edit">
            edit
          </button>
          <button className="popup-submit">
            submit
          </button>
          <button className="popup-delete">
            delete
          </button>
        </div>
    </>
  )
}