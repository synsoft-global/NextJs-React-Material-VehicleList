import axios from "axios"


const country = async () => {
  return await axios.get('/shared/country')
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


const state = async (id: number) => {
  return await axios.get(`/shared/states/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


const currency = async () => {
  return await axios.get(`/shared/currency`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


export const localService = {
  country,
  state,
  currency
}