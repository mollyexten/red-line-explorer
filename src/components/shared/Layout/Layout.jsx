import "./Layout.css";
import Navbar from "../Navbar/Navbar"

export default function Layout(props) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-children">{props.children}</main>
    </div>
  )
}