import axios from "axios"


const create = async (params: any) => {
  return await axios.post('/organizations/create', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const update = async ({id, params}:{id:number, params:any}) => {
  return await axios.put(`/organizations/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const list = async () => {
  return await axios.get('/organizations/list')
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


const item = async (id: number) => {
  return await axios.get('/organizations/' + id)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


const deleteOrg = async (id: number) => {
  return await axios.delete('/organizations/' + id)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


export const organizationService = {
  create,
  update,
  list,
  item,
  deleteOrg
}