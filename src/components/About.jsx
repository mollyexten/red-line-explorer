import { Link } from "react-router-dom"

function About() {
  return (
    <div>
      <header className="header-top">
        <h1>ABOUT</h1>
      </header>
      <p>
        The Red Line is part of the Massachusetts Bay Transportation Authority (MBTA), serving the Boston metro area. The MBTA subway system is commonly referred to as "the T". On Red Line Explorer, you can discover what other people like to do near Red Line stations. This website is useful for out-of-towners looking for hidden gems or locals who want a different perspective on their surroundings.
      </p>
      <p>
        Know of any good activities around a particular Red Line station? Share your experiences!
      </p>
      <Link to="/contribute">
        Add Recommendation
      </Link>
    </div>
  )
}

export default About;