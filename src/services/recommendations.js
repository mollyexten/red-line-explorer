import axios from "axios"
import { recommendationsURL, config } from "./index.js";

export const readRecommendations = async () => {
  const resp = await axios.get(recommendationsURL, config);
  return resp.data.records
}

export const createRecommendation = async (data) => {
  const resp = await axios.post(recommendationsURL, { fields: data }, config)
  console.log(resp.data.id)
  return resp.data.id
}

export const putRecommendation = async (id, data) => {
  const editURL = `${recommendationsURL}/${id}`
  const resp = await axios.put(editURL, { fields: data }, config)
  return resp.data
}