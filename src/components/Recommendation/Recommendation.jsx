import "./Recommendation.css"
import { useEffect, useState } from "react"

function Recommendation(props) {
  const {
    name,
    date,
    content,
  } = props
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    if (date) {
      const dateString = date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4)
      setFormattedDate(dateString)
    }
  }, [date])

  return (
    <div className="rec-text">
      <div className="red-bar">
        <h2 className="rec-name">{name}</h2>
        {date && (<p className="rec-date">{formattedDate}</p>)}
      </div>
      <p className="rec-content">{content}</p>
    </div>
  )
}

export default Recommendation