import { createAsyncThunk } from "@reduxjs/toolkit"
import { vehicleConfigService } from "../services/vehicleConfig.service"


/* create Data */
export const vehiclesCategoryCreate = createAsyncThunk('vehiclesCategoryCreate', vehicleConfigService.categoryCreate)
export const vehiclesTypeCreate = createAsyncThunk('vehiclesType', vehicleConfigService.typeCreate)
export const vehiclesBrandCreate = createAsyncThunk('vehiclesBrand', vehicleConfigService.brandCreate)


/* Update Data */
export const vehiclesCategoryUpdate = createAsyncThunk('vehiclesCategoryUpdate', vehicleConfigService.updateCategory)
export const vehiclesTypeUpdate  = createAsyncThunk('vehiclesTypeUpdate', vehicleConfigService.typeUpdate)
export const vehiclesBrandUpdate = createAsyncThunk('vehiclesBrandUpdate', vehicleConfigService.brandUpdate)


/* Get Data */
export const getVehicleCategoryList = createAsyncThunk('vehiclesCategoryList', vehicleConfigService.vehiclesCategoryList)
export const getVehiclesCategoryById= createAsyncThunk('vehiclesCategoryById', vehicleConfigService.vehiclesCategoryById)
export const getVehicleCategoryDropDownList = createAsyncThunk('vehiclesCategoryDropDownList', vehicleConfigService.vehiclesCategoryDropDownList)

export const getVehicleTypeList = createAsyncThunk('getVehicleTypeList', vehicleConfigService.vehiclesTypeList)
export const getVehicleTypeById = createAsyncThunk('getVehicleTypeById', vehicleConfigService.vehiclesTypeById)
export const getVehicleTypeDropDownList = createAsyncThunk('getVehicleTypeDropDownList', vehicleConfigService.vehiclesTypeListDropDownList)

export const getvehiclesBrandList = createAsyncThunk('getvehiclesBrandList', vehicleConfigService.vehiclesBrandList)
export const getvehiclesBrandById = createAsyncThunk('getvehiclesBrandById', vehicleConfigService.vehiclesBrandById)
export const getvehiclesBrandDropDownList = createAsyncThunk('getvehiclesBrandDropDownList', vehicleConfigService.vehiclesBrandListDropDownList)


/* Delete Data */
export const vehiclesCategoryDelete = createAsyncThunk('vehiclesCategoryDelete', vehicleConfigService.vehiclesCategoryDelete)
export const vehiclesTypeDelete = createAsyncThunk('vehiclesTypeDelete', vehicleConfigService.vehiclesTypeDelete)
export const vehiclesBrandDelete = createAsyncThunk('vehiclesBrandDelete', vehicleConfigService.vehiclesBrandDelete)
