import "./Recommendation.css"
import { useEffect, useState } from "react"

// Variables from the station component are passed as props into this component
function Recommendation(props) {
  const { name, date, content, activity } = props
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    if (date) {
      const dateString = date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4)
      setFormattedDate(dateString)
    }
  }, [date])

  const activityJSX = activity.map(item => <p className={`rec-activity ${item}`}>{item}</p>)

  return (
    <div className="rec-text">
      <div className="red-bar">
        <h2 className="rec-name">{name}</h2>
        {date && (<p className="rec-name">{formattedDate}</p>)}
      </div>
      <p className="rec-content">{content}</p>
      <div className="activities-div">
        {activity && activityJSX}
      </div>
    </div>
  )
}

export default Recommendation