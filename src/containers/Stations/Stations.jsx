import { useState, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import Home from "../../screens/Home/Home"
import ShareIdeas from "../../screens/ShareIdeas/ShareIdeas"
import PreviewPost from "../../screens/PreviewPost/PreviewPost"
import Station from "../../screens/Station/Station"
import { readStations } from "../../services/stations.js"
import {
  readRecommendations,
  createRecommendation,
  putRecommendation,
  deleteRecommendation
} from "../../services/recommendations.js"
import { compareStations } from "../../services/helpers.js"
import { compareRecommendations } from "../../services/helpers.js"

export default function Stations() {
  const history = useHistory()
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

  const getOneRec = (allRecs, id) => {
    const oneRec = allRecs.find(rec => {
      return (rec.id) === id
    })
    return oneRec;
  }

  const postRec = async (data) => {
    const newRec = await createRecommendation(data);
    setAllRecs((prevState) => [...prevState, newRec])
    history.push(`/preview/${newRec.id}`)
  }

  const updateRec = async (id, data) => {
    const updatedRec = await putRecommendation(id, data);
    setAllRecs(prevState => prevState.map(rec => {
      return rec.id === Number(id) ? updatedRec : rec;
    }))
  }

  const removeRec = async (id) => {
    await deleteRecommendation(id)
    setAllRecs(prevState => prevState.filter(rec => rec.id !== id))
    history.push("/")
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
          removeRec={removeRec}
        />
      </Route>
      <Route path="/edit/:id">
        <ShareIdeas
          stationList={stationList}
          updateRec={updateRec}
          allRecs={allRecs}
          getOneRec={getOneRec}
          removeRec={removeRec}
        />
      </Route>
      <Route path="/add/:stationParam">
        <ShareIdeas
          stationList={stationList}
          postRec={postRec}
          allRecs={allRecs}
          getOneRec={getOneRec}
          removeRec={removeRec}
        />
      </Route>
      <Route path="/preview/:recId">
        <PreviewPost
          stationList={stationList}
          allRecs={allRecs}
          getOneRec={getOneRec}
          removeRec={removeRec}
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