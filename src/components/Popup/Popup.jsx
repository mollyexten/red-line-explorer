import "./Popup.css";
import { useHistory } from "react-router-dom";

export default function Popup(props) {
  const history = useHistory();

  return (
    <div className="popup-cover">
      <div className="popup-box">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="popup-edit">edit</button>
          <button className="popup-submit">submit</button>
          <button className="popup-delete">delete</button>
        </div>
      </div>
    </div>
  )
}