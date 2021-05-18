import "./Popup.css";
import { useHistory } from "react-router-dom";

export default function Popup(props) {
  const history = useHistory();
  // const { station } = props

  const handleRedirect = () => {
    history.push(`/`)
  }

  return (
    <div className="popup-cover">
      <div className="popup-box">
        <p className="popup-message">message will go here</p>
        <div className="popup-buttons">
          <button className="popup-edit">edit</button>
          <button
            className="popup-submit"
            onClick={handleRedirect}
          >
            submit
          </button>
          <button className="popup-delete">delete</button>
        </div>
      </div>
    </div>
  )
}