import { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Home from "../../screens/Home/Home"
import ShareIdeas from "../../screens/ShareIdeas/ShareIdeas"
import Station from "../../screens/Station/Station"
import { readStations } from "../../services/stations.js"
import { readRecommendations, createRecommendation, putRecommendation } from "../../services/recommendations.js"
import { compareStations } from "../../services/helpers.js"
import { compareRecommendations } from "../../services/helpers.js"

export default function Stations(props) {
  const [stationList, setStationList] = useState([]);
  const [allRecs, setAllRecs] = useState([])
  
  useEffect(() => {
    const fetchStations = async () => {
      const stations = await readStations();
      const sortedStations = stations.sort(compareStations);
      setStationList(sortedStations);
    }
    const fetchRecommendations = async () => {
      const recommendations = await readRecommendations();
      setAllRecs(recommendations)
    }
    fetchStations();
    fetchRecommendations();
  }, [])

  const getStationRecs = (allRecs, stationId) => {
    const stationRecs = allRecs.filter(rec => rec.fields.station[0] === stationId)
    const chronoRecs = stationRecs.sort(compareRecommendations)
    return chronoRecs;
  }

  const getOneRec = (allRecs, name, content) => {
    const oneRec = allRecs.find(rec => {
      return (rec.fields.name) === name && (rec.fields.content) === content
    })
    return oneRec;
  }

  const postRec = async (data) => {
    const newRec = await createRecommendation(data);
    setAllRecs((prevState) => [...prevState, newRec])
    return newRec;
  }

  const updateRec = async (id, data) => {
    const updatedRec = await putRecommendation(id, data);
    setAllRecs(prevState => prevState.map(rec => {
      return rec.id === Number(id) ? updatedRec : rec;
    }))
  }

  return (
    <Switch>
      <Route exact path="/">
        <Home
          stationList={stationList}
        />
      </Route>
      {/* Putting <ShareIdeas /> above <Station /> to prevent router from replacing <Component /> route with the <Station /> route */}
      <Route path="/share-ideas">
        <ShareIdeas
          stationList={stationList}
          postRec={postRec}
          allRecs={allRecs}
          getOneRec={getOneRec}
        />
      </Route>
      <Route path="/edit/:id">
        <ShareIdeas
          stationList={stationList}
          updateRec={updateRec}
          allRecs={allRecs}
          getOneRec={getOneRec}
        />
      </Route>
      <Route path="/add/:stationParam">
        <ShareIdeas
          stationList={stationList}
          postRec={postRec}
          allRecs={allRecs}
          getOneRec={getOneRec}
        />
      </Route>
      <Route path="/:stationParam">
        <Station
          stationList={stationList}
          getStationRecs={getStationRecs}
          allRecs={allRecs}
        />
      </Route>
    </Switch>
  )
}