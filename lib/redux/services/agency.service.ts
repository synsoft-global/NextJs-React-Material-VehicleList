import axios from "axios"


/* Create Agency Management */
const agencyManagementCreate = async (params: any) => {
  return await axios.post('/agency/create', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Update Agency Management */
const agencyManagementUpdate = async ({id, params}:{id:number, params:any}) => {
  return await axios.put(`/agency/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/*  Agency Management List Item */
const agencyManagementListItem = async (id:number) => {
  return await axios.get(`/agency/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/*  Agency ManagementList By Org Id */
const agencyManagementListByOrg = async (id:number) => {
  return await axios.get(`/agency/list?organizationId=${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


/*  Agency Management List Drop Down */
const agencyManagementDropDownList = async (id:number) => {
  return await axios.get(`/agency/dropDown/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const agencyManagementDelete = async (id:number) => {
  return await axios.delete(`/agency/${id}`)
  .then(response => response.data)
  .catch(err => Promise.reject(err))
}


export const agencyService =  {
  agencyManagementCreate,
  agencyManagementUpdate,
  agencyManagementListItem,
  agencyManagementListByOrg,
  agencyManagementDropDownList,
  agencyManagementDelete,
}