import { Link } from "react-router-dom";
import "./About.css"

function About() {
  return (
    <div>
      <header>
        <h1 className="header-top">ABOUT</h1>
        <h1 className="header-bottom">&nbsp;</h1>
      </header>
      <div>
        <div className="about-container">
                  <section className="about-div">
          <h3 className="about-header">About This Site</h3>
          <p className="about-paragraph">
            Red Line Explorer is a place for users to discover and contribute
            places of interest near MBTA Red Line stations. This website is
            useful for out-of-towners looking for places outside of the regular
            tourist route and locals who want a different perspective on their
            surroundings.
          </p>
          <p className="about-paragraph">
            This website depends on the contributions of users like you! If you
            know of any interesting spots around a particular Red Line station,
            please share your experiences!
          </p>
        </section>
        <Link to="/share-ideas">
          <button className="share-ideas">Share Ideas</button>
        </Link>
        <section className="about-div">
          <h3 className="about-header">About Me</h3>
          <p className="about-paragraph">
            Hi, I’m Molly, and I am the creator of Red Line Explorer! Since
            moving to Boston in 2013, I have spent more time than I care to
            count waiting for and riding on MBTA vehicles. Throughout all my
            experiences on different lines and routes, the Red Line has always
            held a special place in my heart. As we move forward into the “new
            normal”, I hope that we give public transportation the support it
            needs. It is an essential part of society.
          </p>
          <p className="about-paragraph">
            Never grateful when you’re on time, always annoyed when you’re
            twenty minutes away, I dedicate this site to you, Red Line.
          </p>
          <p className="photo-credit">
            Background photo credit:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Outbound_train_at_Charles_MGH_station,_May_2006.jpg">
              Adam E. Moreira
            </a>
            ,
            <a href="http://creativecommons.org/licenses/by-sa/3.0/">
              CC BY-SA 3.0
            </a>
            , via Wikimedia Commons
          </p>
        </section>
        </div>

      </div>
    </div>
  );
}

export default About;
