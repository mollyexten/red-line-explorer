import { useState, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import Home from "../../screens/Home/Home"
import ShareIdeas from "../../screens/ShareIdeas/ShareIdeas"
import ReviewPost from "../../screens/ReviewPost/ReviewPost"
import Station from "../../screens/Station/Station"
import { readStations } from "../../services/stations.js"
import {
  readRecommendations,
  createRecommendation,
  putRecommendation,
  deleteRecommendation
} from "../../services/recommendations.js"
import {
  compareStations,
  compareRecommendations,
  convertKebab
} from "../../services/helpers.js"

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

  const getOneStation = (stations, id) => {
    const oneStation = stations.find(station => {
      return (station.id === id)
    })
    return oneStation
  }

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
      return rec.id === id ? updatedRec : rec;
    }))
    history.push(`/preview/${updatedRec.id}`)
  }

  const removeRec = async (id) => {
    await deleteRecommendation(id)
    setAllRecs(prevState => prevState.filter(rec => rec.id !== id))
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
          convertKebab={convertKebab}
        />
      </Route>
      <Route path="/preview/:recId">
        <ReviewPost
          stationList={stationList}
          getOneStation={getOneStation}
          allRecs={allRecs}
          getOneRec={getOneRec}
          removeRec={removeRec}
          convertKebab={convertKebab}
        />
      </Route>
      <Route path="/:stationParam">
        <Station
          stationList={stationList}
          getStationRecs={getStationRecs}
          allRecs={allRecs}
          convertKebab={convertKebab}
        />
      </Route>
    </Switch>
  )
}