import axios from "axios"


/* Create vehicle Management */
const vehicleManagementCreate = async (params: any) => {
  return await axios.post('/agency-vehicle/create', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Update vehicle Management */
const vehicleManagementUpdate = async ({id, params}:{id:number, params:any}) => {
  return await axios.put(`/agency-vehicle/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/*  vehicle ManagementList Item */
const vehicleManagementItemList = async (id:number) => {
  return await axios.get(`/agency-vehicle/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/*  vehicle ManagementList get */
const vehicleManagementListByOrg = async (params: vehicleManagementListByOrgProps) => {
  return await axios.get(`/agency-vehicle/list`, { params })
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


/*  vehicle ManagementList Delete */
const vehicleManagementDelete = async (id:number) => {
  return await axios.delete(`/agency-vehicle/${id}`)
  .then(response => response.data)
  .catch(err => Promise.reject(err))
}


export const vehicleManagementService=  {
  vehicleManagementCreate,
  vehicleManagementUpdate,
  vehicleManagementItemList,
  vehicleManagementListByOrg,
  vehicleManagementDelete
}



/*  vehicle ManagementList By Org Id */
interface vehicleManagementListByOrgProps {
  page: number
  limit: number
  name?: string
  organizationId: number
}
