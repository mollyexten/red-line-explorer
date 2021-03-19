import "./Recommendation.css"

// Variables from the station component are passed as props into this component
function Recommendation(props) {
  return (
    <div className="rec-text">
      <h3>{props.name}</h3>
      <p>{props.content}</p>
    </div>
  )
}

export default Recommendation