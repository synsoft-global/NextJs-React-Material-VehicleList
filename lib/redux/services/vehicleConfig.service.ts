import axios from "axios"



/* == Vehicle Category == */
/* Category Create */
const categoryCreate = async (params: any) => {
  return await axios.post('/vehicles-category/create', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


/* Category Update */
const updateCategory = async ({id, params}: {id: number, params:any}) => {
  return await axios.put(`/vehicles-category/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Category List */
const vehiclesCategoryList = async () => {
  return await axios.get(`/vehicles-category/list`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Category List Drop Down (Isactive) */
const vehiclesCategoryDropDownList = async () => {
  return await axios.get(`/vehicles-category/dropDown`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Category By Id */
const vehiclesCategoryById = async (id: number) => {
  return await axios.get(`/vehicles-category/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Category Delete */
const vehiclesCategoryDelete = async (id: number) => {
  return await axios.delete(`/vehicles-category/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


/* == Vehicle Type == */
/* Type Create */
const typeCreate = async (params: any) => {
  return await axios.post('/vehicles-type/create', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Vehicle Update */
const typeUpdate= async ({id, params}: {id: number, params:any}) => {
  return await axios.put(`/vehicles-type/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* type By Id */
const vehiclesTypeById = async (id: number) => {
  return await axios.get(`/vehicles-type/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Type List */
const vehiclesTypeList = async () => {
  return await axios.get(`/vehicles-type/list`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Type List Drop Down (Isactive) */
const vehiclesTypeListDropDownList = async () => {
  return await axios.get(`/vehicles-type/dropDown`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Type Delete */
const vehiclesTypeDelete = async (id: number) => {
  return await axios.delete(`/vehicles-type/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


/* == Vehicle Brand == */
/* Brand Create */
const brandCreate = async (params: any) => {
  return await axios.post('/vehicles-brand', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Brand Update */
const brandUpdate= async ({id, params}: {id: number, params:any}) => {
  return await axios.put(`/vehicles-brand/${id}`, params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Brand By Id */
const vehiclesBrandById = async (id: number) => {
  return await axios.get(`/vehicles-brand/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Brand List */
const vehiclesBrandList = async () => {
  return await axios.get(`/vehicles-brand/list`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Brand List Drop Down  (Isactive) */
const vehiclesBrandListDropDownList = async () => {
  return await axios.get(`/vehicles-brand/dropDown`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

/* Brand Delete */
const vehiclesBrandDelete = async (id: number) => {
  return await axios.delete(`/vehicles-brand/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}



export const vehicleConfigService = {
  categoryCreate,
  updateCategory,
  vehiclesCategoryList,
  vehiclesCategoryDropDownList,
  vehiclesCategoryById,
  vehiclesCategoryDelete,

  typeCreate,
  typeUpdate,
  vehiclesTypeList,
  vehiclesTypeDelete,
  vehiclesTypeById,
  vehiclesTypeListDropDownList,

  brandCreate,
  brandUpdate,
  vehiclesBrandById,
  vehiclesBrandList,
  vehiclesBrandDelete,
  vehiclesBrandListDropDownList,
}
