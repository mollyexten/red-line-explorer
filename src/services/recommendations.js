import axios from "axios"
import { recommendationsURL, config } from "./index.js";

export const readRecommendations = async () => {
  const resp = await axios.get(recommendationsURL, config);
  return resp.data.records
}

export const createRecommendation = async (data) => {
  console.log(data)
  const resp = await axios.post(recommendationsURL, { fields: data }, config)
  return resp.data
}

export const putRecommendation = async (id, data) => {
  console.log(id)
  console.log(data)
  const editURL = `${recommendationsURL}/${id}`
  const resp = await axios.put(editURL, { fields: data }, config)
  return resp.data
}

export const deleteRecommendation = async (id) => {
  const deleteURL = `${recommendationsURL}/${id}`
  const resp = await axios.delete(deleteURL, config)
  return resp
}