import { stationsURL, config } from "./index.js";
import axios from "axios"

export const readStations = async () => {
  const resp = await axios.get(stationsURL, config)
  return resp.data.records
}