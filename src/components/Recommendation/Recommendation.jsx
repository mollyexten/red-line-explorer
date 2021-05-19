import "./Recommendation.css"

// Variables from the station component are passed as props into this component
function Recommendation(props) {
  const { name, content } = props
  return (
    <div className="rec-text">
      <h3 className="rec-name">{name}</h3>
      <p className="rec-content">{content}</p>
    </div>
  )
}

export default Recommendation